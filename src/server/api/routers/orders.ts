import { clerkClient } from '@clerk/nextjs/server';
import type { OrderStatus, Prisma, PrismaClient } from '@prisma/client';
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
	total: z.number(),
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
			include: {
				address: true,
				orderItem: {
					include: {
						product: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
            take: 10
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
					total: input.cart.total,
					userId: ctx.userId,
				},
				include: {
					address: true,
				},
			});
			//here bot notification
			return create.orderNumber;
		}),
	createNoAddressIsAuth: publicProcedure
		.input(
			z.object({
				cart: cartInput,

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
				point: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.userId) throw new TRPCError({ code: 'UNAUTHORIZED' });
			const { success } = await ratelimit.orders.limit(ctx.userId);
			if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' });
			const updateUserAddress = await ctx.prisma.address.create({
				data: {
					userId: ctx.userId,
					contactPhone: input.contactPhone,
					firstName: input.firstName,
					lastName: input.lastName,
					point: input.point,
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
					total: input.cart.total,
					userId: ctx.userId,
				},
			});
			//here bot notification
			return createOrder.orderNumber;
		}),
	createNoAuth: publicProcedure
		.input(
			z.object({
				cart: cartInput,
				createProfile: z.boolean(),
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
				point: z.string(),
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
					firstName: input.firstName,
					lastName: input.lastName,
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
						total: input.cart.total,
						address: {
							create: {
								contactPhone: input.contactPhone,
								firstName: input.firstName,
								lastName: input.lastName,
								point: input.point,
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
				return createOrder.orderNumber;
			} else {
				const createOrder = await ctx.prisma.order.create({
					data: {
						address: {
							create: {
								contactPhone: input.contactPhone,
								firstName: input.firstName,
								lastName: input.lastName,
								point: input.point,
							},
						},
						orderItem: {
							createMany: {
								data: getFromCartItems(input.cart),
							},
						},
						total: input.cart.total,
					},
				});
				//hers bot notification
				return createOrder.orderNumber;
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
