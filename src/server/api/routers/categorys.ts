import { z } from 'zod';
import {
	createTRPCRouter,
	privetProcedure,
	publicProcedure,
} from '~/server/api/trpc';

export const categorysRouter = createTRPCRouter({
	getCategorys: publicProcedure.query(async ({ ctx }) => {
		const categories = await ctx.prisma.catrgory.findMany();
		return categories;
	}),
	createCategory: privetProcedure
		.input(z.object({ title: z.string(), path: z.string().includes('/') }))
		.mutation(async ({ ctx, input }) => {
			const { userId } = ctx;
			const categories = await ctx.prisma.catrgory.create({
				data: {
					path: input.path,
					title: input.title,
					createdById: userId,
				},
			});
			return categories;
		}),
});
