import { clerkClient } from '@clerk/nextjs/server';
import type { OrderStatus } from '@prisma/client';
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
			if (input.status === 'CANCELLED') {
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
				returnCount?.orderItem.map(
					async ({ productId, quantity }) =>
						await ctx.prisma.product.update({
							where: {
								id: productId,
							},
							data: {
								quantity: {
									increment: quantity,
								},
							},
						})
				);
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
						.nonempty({ message: 'Введи свой город' })
						.trim(),
					contactPhone: z
						.string()
						.min(16)
						.nonempty({ message: 'Введи свой номер телефона' })
						.trim(),
					point: z
						.string()
						.nonempty({ message: 'Выбери пунт выдачи СДЭК' })
						.trim(),
				}),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.order.create({
				data: {
					orderItem: {
						createMany: {
							data: getAllProductsFromCart(input.cart),
						},
					},
					address: {
						create: {
							city: input.address.city,
							contactPhone: input.address.contactPhone,
							firstName: input.address.firstName,
							lastName: input.address.lastName,
							point: input.address.lastName,
							userId: ctx.userId,
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
						.nonempty({ message: 'Введи свой город' })
						.trim(),
					contactPhone: z
						.string()
						.min(16)
						.nonempty({ message: 'Введи свой номер телефона' })
						.trim(),
					point: z
						.string()
						.nonempty({ message: 'Выбери пунт выдачи СДЭК' })
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
			if (input.createProfile) {
				const createUserClerk = await clerkClient.users.createUser({
					emailAddress: [input.email as string],
					password: input.password as string,
					firstName: input.address.firstName,
					lastName: input.address.lastName,
				});
				if (!createUserClerk)
					return new TRPCError({
						code: 'CONFLICT',
						message: 'Такой пользователь уже есть',
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
					},
				});
			}
		}),
});
