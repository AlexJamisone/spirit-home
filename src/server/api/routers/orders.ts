import { clerkClient } from '@clerk/nextjs/server';
import { TRPCError } from '@trpc/server';
import { filterUserForClient } from '~/server/helpers/filterUserForClient';

import { createTRPCRouter, privetProcedure } from '~/server/api/trpc';

export const ordersRouter = createTRPCRouter({
	get: privetProcedure.query(async ({ ctx }) => {
		const orders = await ctx.prisma.order.findMany({
			select: {
				orderItem: {
					include: {
						product: true,
					},
				},
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
});
