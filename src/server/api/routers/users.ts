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
				cart: true,
				comments: true,
				orders: true,
				categories: true,
			},
		});

		if (!findUser) {
			await ctx.prisma.user.create({
				data: {
					id: ctx.userId,
				},
			});
			await ctx.prisma.cart.create({
				data: {
					userId: ctx.userId,
				},
			});
		}
		const [user] = await clerkClient.users.getUserList({
			userId: [ctx.userId],
		});
		if (!user)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'User not found',
			});
		const userClerk = filterUserForClient(user);
		return {
			...userClerk,
			...findUser,
		};
	}),
});
