import { clerkClient } from '@clerk/nextjs/server';
import { TRPCError } from '@trpc/server';
import { filterUserForClient } from '~/server/helpers/filterUserForClient';

import { createTRPCRouter, privetProcedure } from '~/server/api/trpc';

export const usersRouter = createTRPCRouter({
	get: privetProcedure.query(async ({ ctx }) => {
		const findUser = await ctx.prisma.user.findUnique({
			where: {
				id: ctx.userId,
			},
			include: {
				comments: true,
				orders: {
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
					orderBy: {
						createdAt: 'desc',
					},
				},
				categories: true,
				address: true,
			},
		});
		const [user] = await clerkClient.users.getUserList({
			userId: [ctx.userId],
		});
		if (!user)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'User not found',
			});
		const userClerk = filterUserForClient(user);
		if (!findUser) {
			await ctx.prisma.user.create({
				data: {
					id: ctx.userId,
					email: userClerk.email,
				},
			});
		}
		return {
			...userClerk,
			...findUser,
		};
	}),
});
