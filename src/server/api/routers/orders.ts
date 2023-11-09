import { clerkClient } from '@clerk/nextjs/server';
import type { OrderStatus, Point, Prisma, PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
	adminProcedure,
	createTRPCRouter,
	privetProcedure,
	publicProcedure,
} from '~/server/api/trpc';
import { ratelimit } from '~/server/helpers/ratelimits';

export type ContextType = {
	prisma: PrismaClient<
		Prisma.PrismaClientOptions,
		never,
		Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
	>;
	userId: string | null;
};

const cartInput = z.object({
	items: z.array(
		z.object({
			id: z.string(),
			quantity: z.number(),
			price: z.number(),
			size: z.string(),
		})
	),
	totalPrice: z.number(),
});

function getFromCartItems(cart: (typeof cartInput)['_input']) {
	return cart.items.map((item) => ({
		price: item.price,
		productId: item.id,
		quantity: item.quantity,
		size: item.size,
	}));
}

export const ordersRouter = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.order.findMany({
			select: {
				orderItem: {
					include: {
						product: {
							include: {
								size: true,
							},
						},
					},
				},
				address: {
					include: {
						point: true,
					},
				},
				createdAt: true,
				id: true,
				status: true,
				viewed: true,
				user: {
					include: {
						address: true,
					},
				},
				userId: true,
				orderNumber: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}),
	changeStatus: adminProcedure
		.input(z.object({ status: z.custom<OrderStatus>(), id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			if (input.status === 'CANCELLED') {
				return await ctx.prisma.order.update({
					where: {
						id: input.id,
					},
					data: {
						status: input.status,
					},
				});
			}
			return await ctx.prisma.order.update({
				where: {
					id: input.id,
				},
				data: {
					status: input.status,
				},
			});
		}),
	createWithAddressId: publicProcedure
		.input(
			z.object({
				idAddress: z.string(),
				cart: cartInput,
			})
		)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.userId) throw new TRPCError({ code: 'UNAUTHORIZED' });
			const { success } = await ratelimit.orders.limit(ctx.userId);
			if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' });
			const create = await ctx.prisma.order.create({
				data: {
					addressId: input.idAddress,
					orderItem: {
						createMany: {
							data: getFromCartItems(input.cart),
						},
					},
					userId: ctx.userId,
				},
				include: {
					address: {
						include: {
							point: true,
						},
					},
				},
			});
			//here bot notification
			return create;
		}),
	createNoAddressIsAuth: publicProcedure
		.input(
			z.object({
				cart: cartInput,
				address: z.object({
					firstName: z
						.string()
						.nonempty({ message: 'Нужно ввести своё имя.' })
						.trim(),
					lastName: z
						.string()
						.nonempty({ message: 'Нужо ввести свою фамилию.' })
						.trim(),
					contactPhone: z
						.string()
						.min(16, { message: 'Неправельный номер телефона.' })
						.trim(),
					point: z.custom<Point>(),
				}),
			})
		)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.userId) throw new TRPCError({ code: 'UNAUTHORIZED' });
			const { success } = await ratelimit.orders.limit(ctx.userId);
			if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' });
			const updateUserAddress = await ctx.prisma.address.create({
				data: {
					userId: ctx.userId,
					contactPhone: input.address.contactPhone,
					firstName: input.address.firstName,
					lastName: input.address.lastName,
					point: {
						create: {
							name: input.address.point.name,
							addressFullName:
								input.address.point.addressFullName,
							addressName: input.address.point.addressName,
							city: input.address.point.city,
							email: input.address.point.email,
							region: input.address.point.region,
							latitude: input.address.point.latitude,
							longitude: input.address.point.longitude,
							type: input.address.point.type,
							work_time: input.address.point.work_time,
							phone: input.address.point.phone,
						},
					},
				},
			});
			const createOrder = await ctx.prisma.order.create({
				data: {
					addressId: updateUserAddress.id,
					orderItem: {
						createMany: {
							data: getFromCartItems(input.cart),
						},
					},
					userId: ctx.userId,
				},
			});
			//here bot notification
			return createOrder;
		}),
	createNoAuth: publicProcedure
		.input(
			z.object({
				cart: cartInput,
				createProfile: z.boolean(),
				address: z.object({
					firstName: z
						.string()
						.nonempty({ message: 'Нужно ввести своё имя.' })
						.trim(),
					lastName: z
						.string()
						.nonempty({ message: 'Нужо ввести свою фамилию.' })
						.trim(),
					contactPhone: z
						.string()
						.min(16, { message: 'Неправильный номер телефона.' })
						.trim(),
					point: z.custom<Point>(),
				}),
				email: z.optional(
					z
						.string()
						.optional()
						.or(z.string().email({ message: 'Неверный email' }))
				),
				password: z
					.string()
					.optional()
					.or(
						z.string().min(8, {
							message: 'Пароль должен быть минимум 8 символов',
						})
					),
			})
		)
		.mutation(async ({ ctx, input }) => {
			if (input.createProfile && input.password) {
				if (input.password.length < 8)
					throw new TRPCError({
						code: 'CONFLICT',
						message: 'Пароль должен быть минимум 8 символов',
					});
				const createUserClerk = await clerkClient.users.createUser({
					emailAddress: [input.email as string],
					password: input.password,
					firstName: input.address.firstName,
					lastName: input.address.lastName,
				});
				const createUser = await ctx.prisma.user.create({
					data: {
						id: createUserClerk.id,
						email: createUserClerk.emailAddresses[0]?.emailAddress,
						firstName: createUserClerk.firstName,
						lastName: createUserClerk.lastName,
					},
				});
				const createOrder = await ctx.prisma.order.create({
					data: {
						orderItem: {
							createMany: {
								data: getFromCartItems(input.cart),
							},
						},
						address: {
							create: {
								contactPhone: input.address.contactPhone,
								firstName: input.address.firstName,
								lastName: input.address.lastName,
								point: {
									create: {
										name: input.address.point.name,
										addressFullName:
											input.address.point.addressFullName,
										addressName:
											input.address.point.addressName,
										city: input.address.point.city,
										email: input.address.point.email,
										region: input.address.point.region,
										latitude: input.address.point.latitude,
										longitude:
											input.address.point.longitude,
										type: input.address.point.type,
										work_time:
											input.address.point.work_time,
										phone: input.address.point.phone,
									},
								},
								userId: createUser.id,
							},
						},
					},
				});
				await ctx.prisma.user.update({
					where: {
						id: createUser.id,
					},
					data: {
						orders: {
							connect: { id: createOrder.id },
						},
					},
				});
				//here bot notification
				return createOrder;
			} else {
				const createOrder = await ctx.prisma.order.create({
					data: {
						address: {
							create: {
								contactPhone: input.address.contactPhone,
								firstName: input.address.firstName,
								lastName: input.address.lastName,
								point: {
									create: {
										name: input.address.point.name,
										addressFullName:
											input.address.point.addressFullName,
										addressName:
											input.address.point.addressName,
										city: input.address.point.city,
										email: input.address.point.email,
										region: input.address.point.region,
										latitude: input.address.point.latitude,
										longitude:
											input.address.point.longitude,
										type: input.address.point.type,
										work_time:
											input.address.point.work_time,
										phone: input.address.point.phone,
									},
								},
							},
						},
						orderItem: {
							createMany: {
								data: getFromCartItems(input.cart),
							},
						},
					},
				});
				//hers bot notification
				return createOrder;
			}
		}),
	changeViewd: adminProcedure
		.input(z.object({ viewed: z.boolean(), id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			if (!ctx.userId) throw new TRPCError({ code: 'UNAUTHORIZED' });
			const { success } = await ratelimit.orderView.limit(ctx.userId);
			if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' });
			return await ctx.prisma.order.update({
				where: {
					id: input.id,
				},
				data: {
					viewed: input.viewed,
				},
			});
		}),
	getNotViewd: privetProcedure.query(async ({ ctx }) => {
		return ctx.prisma.order.findMany({
			where: {
				NOT: {
					viewed: true,
				},
			},
		});
	}),
});
