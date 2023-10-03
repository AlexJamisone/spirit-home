import { clerkClient } from '@clerk/nextjs/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
	createTRPCRouter,
	privetProcedure,
	publicProcedure,
} from '~/server/api/trpc';
import { filterUserForClient } from '~/server/helpers/filterUserForClient';

export const usersRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		if(!ctx.userId) return null
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
										priceHistory: {
											orderBy: {
												effectiveFrom: 'desc',
											},
										},
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
				address: {
					include: {
						point: true,
					},
				},
				favorites: {
					select: {
						productId: true,
					},
				},
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
					email: userClerk?.email,
					firstName: user.firstName ?? '',
					lastName: user.lastName ?? '',
				},
			});
		}
		return {
			...findUser,
			...userClerk,
		};
	}),
	getUserForFav: privetProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.user.findUnique({
			where: {
				id: ctx.userId,
			},
			include: {
				favorites: {
					select: {
						productId: true,
					},
				},
			},
		});
	}),
	getUserForFavProduct: privetProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.user.findUnique({
			where: {
				id: ctx.userId,
			},
			include: {
				favorites: {
					select: {
						product: {
							include: {
								priceHistory: true,
								quantity: {
									include: {
										size: true,
									},
								},
								category: true,
								subCategory: true,
							},
						},
					},
				},
			},
		});
	}),
	changeFirstName: privetProcedure
		.input(
			z.object({
				name: z
					.string()
					.transform(
						(val) =>
							val.charAt(0).toUpperCase() +
							val.slice(1).toLowerCase()
					),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.user.update({
				where: {
					id: ctx.userId,
				},
				data: {
					firstName: input.name,
				},
			});
		}),
	changeLastName: privetProcedure
		.input(
			z.object({
				lastName: z
					.string()
					.transform(
						(val) =>
							val.charAt(0).toUpperCase() +
							val.slice(1).toLowerCase()
					),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.user.update({
				where: {
					id: ctx.userId,
				},
				data: {
					lastName: input.lastName,
				},
			});
		}),
	getUserRole: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.userId) return null;
		const user = await ctx.prisma.user.findUnique({
			where: {
				id: ctx.userId,
			},
		});
		if (!user) return undefined;
		return user.role;
	}),
});
