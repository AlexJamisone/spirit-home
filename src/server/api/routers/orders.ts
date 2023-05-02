import { clerkClient } from '@clerk/nextjs/server';
import type { OrderStatus, Prisma, PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import type { CartState } from '~/reducer/CartReducer';
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from '~/server/api/trpc';

function getAllProductsFromCart(cart: CartState): {
	productId: string;
	quantity: number;
}[] {
	return cart.items.map(({ id, quantityInCart }) => ({
		productId: id,
		quantity: quantityInCart,
	}));
}

async function operationWithProducts(
	ctx: {
		prisma: PrismaClient<
			Prisma.PrismaClientOptions,
			never,
			Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
		>;
		userId: string | null;
	},
	productId: string,
	quantity: number,
	operation: 'plus' | 'minus'
) {
	return await ctx.prisma.product.update({
		where: {
			id: productId,
		},
		data: {
			quantity: {
				decrement: operation === 'minus' ? quantity : undefined,
				increment: operation === 'plus' ? quantity : undefined,
			},
		},
	});
}

export const ordersRouter = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
		const orders = await ctx.prisma.order.findMany({
			select: {
				orderItem: {
					include: {
						product: {
							include: {
								priceHistory: {
									orderBy: {
										effectiveFrom: 'desc',
									},
								},
							},
						},
					},
				},
				address: true,
				createdAt: true,
				id: true,
				status: true,
				user: {
					include: {
						address: true,
					},
				},
				userId: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
		return orders;
	}),
	changeStatus: adminProcedure
		.input(z.object({ status: z.custom<OrderStatus>(), id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const returnCount = await ctx.prisma.order.findUnique({
				where: {
					id: input.id,
				},
				select: {
					orderItem: {
						include: {
							product: {
								select: {
									quantity: true,
								},
							},
						},
					},
				},
			});
			switch (input.status) {
				case 'CANCELLED':
					returnCount?.orderItem.map(
						async ({ productId, quantity }) =>
							await operationWithProducts(
								ctx,
								productId,
								quantity,
								'plus'
							)
					);
					return await ctx.prisma.order.update({
						where: {
							id: input.id,
						},
						data: {
							status: input.status,
						},
					});
				case 'COMPLETED':
					returnCount?.orderItem.map(
						async ({ productId, quantity }) =>
							await operationWithProducts(
								ctx,
								productId,
								quantity,
								'minus'
							)
					);
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
				cart: z.custom<CartState>(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.order.create({
				data: {
					addressId: input.idAddress,
					orderItem: {
						createMany: {
							data: getAllProductsFromCart(input.cart),
						},
					},
					userId: ctx.userId,
				},
			});
		}),
	createNoAddressIsAuth: publicProcedure
		.input(
			z.object({
				cart: z.custom<CartState>(),
				address: z.object({
					firstName: z
						.string()
						.nonempty({ message: 'Нужно ввести своё имя.' })
						.trim(),
					lastName: z
						.string()
						.nonempty({ message: 'Нужо ввести свою фамилию.' })
						.trim(),
					city: z
						.string()
						.nonempty({ message: 'Введи свой город.' })
						.trim(),
					contactPhone: z
						.string()
						.min(16, { message: 'Неправельный номер телефона.' })
						.trim(),
					point: z
						.string()
						.nonempty({ message: 'Выбери пунт выдачи СДЭК.' })
						.trim(),
				}),
			})
		)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.userId) throw new TRPCError({ code: 'UNAUTHORIZED' });
			return await ctx.prisma.user.update({
				where: {
					id: ctx.userId,
				},
				data: {
					orders: {
						create: {
							address: {
								create: {
									city: input.address.city,
									contactPhone: input.address.contactPhone,
									firstName: input.address.firstName,
									lastName: input.address.lastName,
									point: input.address.point,
									userId: ctx.userId,
								},
							},
							orderItem: {
								createMany: {
									data: getAllProductsFromCart(input.cart),
								},
							},
						},
					},
				},
			});
		}),
	createNoAuth: publicProcedure
		.input(
			z.object({
				cart: z.custom<CartState>(),
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
					city: z
						.string()
						.nonempty({ message: 'Введи свой город.' })
						.trim(),
					contactPhone: z
						.string()
						.min(16, { message: 'Неправельный номер телефона.' })
						.trim(),
					point: z
						.string()
						.nonempty({ message: 'Выбери пунт выдачи СДЭК.' })
						.trim(),
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
				return await ctx.prisma.user.create({
					data: {
						id: createUserClerk.id,
						email: createUserClerk.emailAddresses[0]?.emailAddress,
						firstName: createUserClerk.firstName,
						lastName: createUserClerk.lastName,
						orders: {
							create: {
								address: {
									create: {
										city: input.address.city,
										contactPhone:
											input.address.contactPhone,
										firstName: input.address.firstName,
										lastName: input.address.lastName,
										point: input.address.point,
									},
								},
								orderItem: {
									createMany: {
										data: getAllProductsFromCart(
											input.cart
										),
									},
								},
							},
						},
						address: {
							create: {
								city: input.address.city,
								contactPhone: input.address.contactPhone,
								firstName: input.address.firstName,
								lastName: input.address.lastName,
								point: input.address.point,
							},
						},
					},
				});
			} else {
				return await ctx.prisma.order.create({
					data: {
						address: {
							create: {
								city: input.address.city,
								contactPhone: input.address.contactPhone,
								firstName: input.address.firstName,
								lastName: input.address.lastName,
								point: input.address.point,
							},
						},
						orderItem: {
							createMany: {
								data: getAllProductsFromCart(input.cart),
							},
						},
					},
				});
			}
		}),
});
