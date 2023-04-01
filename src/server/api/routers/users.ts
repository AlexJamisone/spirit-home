import { clerkClient } from '@clerk/nextjs/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { filterUserForClient } from '~/server/helpers/filterUserForClient';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const usersRouter = createTRPCRouter({
	getUser: publicProcedure
		.input(z.object({ email: z.string() }))
		.query(async ({ input, ctx }) => {
			const [user] = await clerkClient.users.getUserList({
				emailAddress: [input.email],
			});
			if (!user)
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'User not found',
				});
			const findUser = await ctx.prisma.user.findUnique({
				where: {
					id: user.id
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
						id: user.id,
					}
				})
				return await ctx.prisma.user.findUnique({
					where: {
						id: user.id
					},
					include: {
						cart: true,
						comments: true,
						orders: true,
						categories: true
					}
				})
			}
			return filterUserForClient(user, findUser)
		}),
});
