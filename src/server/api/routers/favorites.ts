import { z } from 'zod';
import { createTRPCRouter, privetProcedure } from '~/server/api/trpc';

export const favoritesRouter = createTRPCRouter({
	handlAddOrRemoveFav: privetProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const existingFav = await ctx.prisma.favorites.findUnique({
				where: {
					productId: input.id,
				},
			});
			if (!existingFav) {
				return await ctx.prisma.favorites.create({
					data: {
						productId: input.id,
						userId: ctx.userId,
					},
				});
			} else {
				return await ctx.prisma.favorites.delete({
					where: {
						productId: input.id,
					},
				});
			}
		}),
});
