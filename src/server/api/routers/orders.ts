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
	createWithAuth: publicProcedure
		.input(
			z.object({
				address: z.string(),
				cart: z.custom<CartState>(),
				addressObject: z.object({
					city: z.string().nonempty({ message: 'Введи свой город' }),
					contactPhone: z
						.string()
						.nonempty({ message: 'Введи свой номер телефона' }),
					point: z
						.string()
						.nonempty({ message: 'Выбери пунт выдачи СДЭК' }),
					firstName: z
						.string()
						.nonempty({ message: 'Нужно ввести своё имя.' }),
					lastName: z
						.string()
						.nonempty({ message: 'Нужо ввести свою фамилию.' }),
				}),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const product = input.cart.items.map(({ id, quantityInCart }) => ({
				productId: id,
				quantity: quantityInCart,
			}));
			const createAddress = await ctx.prisma.address.create({
				data: {
					userId: ctx.userId as string,
					city: input.addressObject.city,
					contactPhone: input.addressObject.contactPhone,
					firstName: input.addressObject.firstName,
					lastName: input.addressObject.lastName,
					point: input.addressObject.point,
				},
			});
			const createOrder = await ctx.prisma.order.create({
				data: {
					userId: ctx.userId as string,
					orderItem: {
						createMany: { data: product },
					},
					addressId: createAddress.id,
				},
			});
			const updateProduct = Promise.all(
				input.cart.items.map(
					async ({ id, quantityInCart }) =>
						await ctx.prisma.product.update({
							where: {
								id,
							},
							data: {
								quantity: {
									decrement: quantityInCart,
								},
							},
						})
				)
			);
			await updateProduct;
			if (!createOrder)
				return new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Ошибка с созданием заказа',
				});
			return createOrder;
		}),
	createNotAuth: publicProcedure
		.input(
			z.object({
				email: z.string().email().optional(),
				password: z.string().optional(),
				firstName: z.string().nonempty(),
				lastName: z.string().nonempty(),
				saveAddress: z.boolean(),
				createUser: z.boolean(),
				address: z.object({
					city: z.string().nonempty(),
					contactPhone: z.string().nonempty(),
					point: z.string().nonempty(),
				}),
				cart: z.custom<CartState>(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const product = input.cart.items.map(({ id, quantityInCart }) => ({
				productId: id,
				quantity: quantityInCart,
			}));
			if (input.createUser) {
				const createUserClerk = await clerkClient.users.createUser({
					emailAddress: [input.email as string],
					password: input.password,
					firstName: input.firstName ?? '',
					lastName: input.lastName ?? '',
				});
				const checkUserDb = await ctx.prisma.user.findUnique({
					where: {
						id: createUserClerk.id,
					},
				});
				if (!checkUserDb) {
					return await ctx.prisma.user.create({
						data: {
							id: createUserClerk.id,
							email: createUserClerk.emailAddresses[0]
								?.emailAddress,
							firstName: createUserClerk.firstName,
							lastName: createUserClerk.lastName,
							address: {
								create: input.saveAddress
									? {
											city: input.address.city,
											contactPhone:
												input.address.contactPhone,
											firstName: input.firstName,
											lastName: input.lastName,
											point: input.address.point,
									  }
									: undefined,
							},
							orders: {
								create: {
									address: {
										create: {
											city: input.address.city,
											contactPhone:
												input.address.contactPhone,
											firstName: input.firstName,
											lastName: input.lastName,
											point: input.address.point,
										},
									},
									orderItem: {
										createMany: { data: product },
									},
								},
							},
						},
					});
				}
			} else {
				return await ctx.prisma.order.create({
					data: {
						address: {
							create: {
								city: input.address.city,
								contactPhone: input.address.contactPhone,
								firstName: input.firstName,
								lastName: input.lastName,
								point: input.address.point,
							},
						},
						orderItem: {
							createMany: { data: product },
						},
					},
				});
			}
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
	create: publicProcedure
		.input(
			z.object({
				isAuth: z.boolean(),
				cart: z.custom<CartState>(),
				idAddress: z.string().optional(),
				createUser: z.boolean().optional(),
				saveAddress: z.boolean().optional(),
				address: z
					.object({
						city: z
							.string()
							.nonempty({ message: 'Введи свой город' })
							.trim(),
						contactPhone: z
							.string()
							.min(16)
							.nonempty({ message: 'Введи свой номер телефона' })
							.trim(),
						firstName: z
							.string()
							.nonempty({ message: 'Нужно ввести своё имя.' })
							.trim(),
						lastName: z
							.string()
							.nonempty({ message: 'Нужо ввести свою фамилию.' })
							.trim(),
						point: z
							.string()
							.nonempty({ message: 'Выбери пунт выдачи СДЭК' })
							.trim(),
					})
					.optional(),
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
			const product = input.cart.items.map(({ id, quantityInCart }) => ({
				productId: id,
				quantity: quantityInCart,
			}));
			if (input.isAuth) {
				const userAddress = await ctx.prisma.user.findUnique({
					where: {
						id: ctx.userId as string,
					},
					include: {
						address: true,
					},
				});
				const filtrArch = userAddress?.address.filter(
					(address) => !address.archived
				);
				if (filtrArch?.length === 0 && input.address) {
					return await ctx.prisma.order.create({
						data: {
							orderItem: {
								createMany: { data: product },
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
							user: {
								connect: { id: ctx.userId as string },
							},
						},
					});
				} else {
					return await ctx.prisma.order.create({
						data: {
							orderItem: {
								createMany: { data: product },
							},
							addressId: input.idAddress ?? '',
						},
					});
				}
			} else {
				if (input.createUser && input.address) {
					const createUserClerk = await clerkClient.users.createUser({
						emailAddress: [input.email as string],
						password: input.password as string,
						firstName: input.address.firstName,
						lastName: input.address.lastName,
					});
					const checkUserDb = await ctx.prisma.user.findUnique({
						where: {
							id: createUserClerk.id,
						},
					});
					if (!checkUserDb) {
						return await ctx.prisma.user.create({
							data: {
								id: createUserClerk.id,
								email: createUserClerk.emailAddresses[0]
									?.emailAddress,
								firstName: createUserClerk.firstName,
								lastName: createUserClerk.lastName,
								address: {
									create: input.saveAddress
										? {
												city: input.address.city,
												contactPhone:
													input.address.contactPhone,
												firstName:
													input.address.firstName,
												lastName:
													input.address.lastName,
												point: input.address.point,
										  }
										: undefined,
								},
								orders: {
									create: {
										address: {
											create: {
												city: input.address.city,
												contactPhone:
													input.address.contactPhone,
												firstName:
													input.address.firstName,
												lastName:
													input.address.lastName,
												point: input.address.point,
											},
										},
										orderItem: {
											createMany: { data: product },
										},
									},
								},
							},
						});
					}
				} else if (input.address) {
					await ctx.prisma.order.create({
						data: {
							orderItem: {
								createMany: {
									data: product,
								},
							},
							address: {
								create: {
									city: input.address?.city,
									contactPhone: input.address?.contactPhone,
									firstName: input.address?.firstName,
									lastName: input.address?.lastName,
									point: input.address?.point,
								},
							},
						},
					});
				}
			}
		}),
});
