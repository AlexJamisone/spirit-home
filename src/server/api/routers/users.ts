import { clerkClient } from '@clerk/nextjs/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { filterUserForClient } from '~/server/helpers/filterUserForClient';

import { createTRPCRouter, publicProcedure, privetProcedure } from '~/server/api/trpc';

export const usersRouter = createTRPCRouter({
	getUser: privetProcedure
		.query(async ({ ctx }) => {
			const findUser = await ctx.prisma.user.findUnique({
				where: {
					id: ctx.userId
				},
				include: {
					cart: true,
					comments: true,
					orders: true,
					categories: true
				}
			})
			
			if(!findUser) {
				await ctx.prisma.user.create({
					data: {
						id: ctx.userId,
					}
				})
			}
			const [user] = await clerkClient.users.getUserList({
				userId: [ctx.userId]
			});
			if (!user)
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'User not found',
				});
			const userClerk = filterUserForClient(user)
			return {
				...userClerk,
				...findUser
			}
		}),
});
