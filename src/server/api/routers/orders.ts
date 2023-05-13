import { clerkClient } from '@clerk/nextjs/server';
import type { OrderStatus, Prisma, PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import dayjs from 'dayjs';
import { z } from 'zod';
require('dayjs/locale/ru');
dayjs().locale('ru').format();

import type { CartState } from '~/reducer/CartReducer';
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from '~/server/api/trpc';
import { ratelimit } from '~/server/helpers/ratelimits';

type ContextType = {
	prisma: PrismaClient<
		Prisma.PrismaClientOptions,
		never,
		Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
	>;
	userId: string | null;
};

function getAllProductsFromCart(cart: CartState): {
	productId: string;
	quantity: number;
	selectedQtId: string;
}[] {
	return cart.items.map(({ id, quantityInCart, selectedSize }) => ({
		productId: id,
		quantity: quantityInCart,
		selectedQtId: selectedSize.id,
	}));
}

async function handlUpdateProduct(
	ctx: ContextType,
	orderId: string,
	operation: 'plus' | 'minus'
) {
	const returnCount = await ctx.prisma.order.findUnique({
		where: {
			id: orderId,
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
	return returnCount?.orderItem.map(
		async ({ productId, quantity, selectedQtId }) =>
			await operationWithProducts(
				ctx,
				productId,
				quantity,
				operation,
				selectedQtId
			)
	);
}

async function operationWithProducts(
	ctx: ContextType,
	productId: string,
	quantity: number,
	operation: 'plus' | 'minus',
	qtId: string
) {
	return await ctx.prisma.product.update({
		where: {
			id: productId,
		},
		data: {
			quantity: {
				update: {
					data: {
						value: {
							decrement:
								operation === 'minus' ? quantity : undefined,
							increment:
								operation === 'plus' ? quantity : undefined,
						},
					},
					where: {
						id: qtId,
					},
				},
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
								quantity: {
									include: {
										size: true,
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
	getForCharts: adminProcedure.query(async ({ ctx }) => {
		const now = new Date();
		const startOfMount = new Date(now.getFullYear(), now.getMonth(), 1);
		const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
		const dates = [];
		for (
			let date = new Date(startOfMount);
			date <= endOfMonth;
			date.setDate(date.getDate() + 1)
		) {
			dates.push(dayjs(date).format('D MMM'));
		}
		const orders = ctx.prisma.order.findMany({
			where: {
				createdAt: {
					gte: startOfMount,
					lte: endOfMonth,
				},
			},
			select: {
				createdAt: true,
				status: true,
			},
		});
		const stat = ctx.prisma.order.findMany({
			where: {
				createdAt: {
					gte: startOfMount,
				},
				NOT: {
					status: 'CANCELLED',
				},
			},
			include: {
				orderItem: {
					include: {
						product: {
							include: {
								priceHistory: true,
							},
						},
					},
				},
			},
		});

		const [charts, statictic] = await ctx.prisma.$transaction([
			orders,
			stat,
		]);
		//stat
		let jamisonRevenue = 0;
		let todayRevenue = 0;
		statictic.forEach((order) => {
			let orderRevenu = 0;
			order.orderItem.forEach((orderItem) => {
				const findPrice = orderItem.product.priceHistory.find(
					(price) =>
						price.effectiveFrom.getDate() <=
						order.createdAt.getDate()
				);
				const price = findPrice ? findPrice.price : 0;
				console.log(findPrice);
				orderRevenu += orderItem.quantity * price;
			});
			if (order.createdAt.getDate() === now.getDate()) {
				todayRevenue += orderRevenu;
			}
			jamisonRevenue += orderRevenu;
		});

		//charts
		const counts: { [key: string]: number } = {};
		const canceledCounts: { [key: string]: number } = {};
		charts.forEach((order) => {
			const date = dayjs(order.createdAt).format('D MMM');
			if (order.status === 'CANCELLED') {
				canceledCounts[date] = (canceledCounts[date] || 0) + 1;
			}
			counts[date] = (counts[date] || 0) + 1;
		});
		const chartData = dates.map((date) => ({
			date,
			'Количество заказов': counts[date] || 0,
			'Отменёные заказы': canceledCounts[date] || 0,
		}));
		return {
			data: chartData,
			today: todayRevenue,
			jamison: jamisonRevenue * 0.1,
		};
	}),
	changeStatus: adminProcedure
		.input(z.object({ status: z.custom<OrderStatus>(), id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			if (input.status === 'CANCELLED') {
				await handlUpdateProduct(ctx, input.id, 'plus');
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
			if (!ctx.userId) throw new TRPCError({ code: 'UNAUTHORIZED' });
			const { success } = await ratelimit.orders.limit(ctx.userId);
			if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' });
			const create = await ctx.prisma.order.create({
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
			return await handlUpdateProduct(ctx, create.id, 'minus');
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
			const { success } = await ratelimit.orders.limit(ctx.userId);
			if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' });
			const updateUserAddress = await ctx.prisma.address.create({
				data: {
					userId: ctx.userId,
					city: input.address.city,
					contactPhone: input.address.contactPhone,
					firstName: input.address.firstName,
					lastName: input.address.lastName,
					point: input.address.point,
				},
			});
			const createOrder = await ctx.prisma.order.create({
				data: {
					addressId: updateUserAddress.id,
					orderItem: {
						createMany: {
							data: getAllProductsFromCart(input.cart),
						},
					},
					userId: ctx.userId,
				},
			});
			return await handlUpdateProduct(ctx, createOrder.id, 'minus');
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
								data: getAllProductsFromCart(input.cart),
							},
						},
						address: {
							create: {
								city: input.address.city,
								contactPhone: input.address.contactPhone,
								firstName: input.address.firstName,
								lastName: input.address.lastName,
								point: input.address.point,
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
				return await handlUpdateProduct(ctx, createOrder.id, 'minus');
			} else {
				const createOrder = await ctx.prisma.order.create({
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
				return handlUpdateProduct(ctx, createOrder.id, 'minus');
			}
		}),
});
