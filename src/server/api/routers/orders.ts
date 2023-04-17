import { clerkClient } from '@clerk/nextjs/server';
import { TRPCError } from '@trpc/server';
import { filterUserForClient } from '~/server/helpers/filterUserForClient';
import { z } from 'zod';

import {
	createTRPCRouter,
	privetProcedure,
	publicProcedure,
} from '~/server/api/trpc';
import type { Address } from '@prisma/client';
import type { CartState } from '~/reducer/CartReducer';

export const ordersRouter = createTRPCRouter({
	get: privetProcedure.query(async ({ ctx }) => {
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
});
