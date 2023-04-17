import { OrderStatus } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import type { CartState } from '~/reducer/CartReducer';
import {
	createTRPCRouter,
	privetProcedure,
	publicProcedure,
	adminProcedure,
} from '~/server/api/trpc';

export const ordersRouter = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
		const orders = await ctx.prisma.order.findMany({
			select: {
				orderItem: {
					include: {
						product: true,
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
	create: publicProcedure
		.input(
			z.object({
				address: z.string().nonempty(),
				cart: z.custom<CartState>(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const product = input.cart.items.map(({ id, quantityInCart }) => ({
				productId: id,
				quantity: quantityInCart,
			}));
			const createOrder = await ctx.prisma.order.create({
				data: {
					userId: ctx.userId as string,
					orderItem: {
						createMany: { data: product },
					},
					addressId: input.address,
				},
			});
			if (!createOrder)
				return new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Ошибка с созданием заказа',
				});
			return createOrder;
		}),
	changeStatus: adminProcedure
		.input(z.object({ status: z.custom<OrderStatus>(), id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.order.update({
				where: {
					id: input.id,
				},
				data: {
					status: input.status,
				},
			});
		}),
});
