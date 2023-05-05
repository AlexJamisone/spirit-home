import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from '~/server/api/trpc';

export const sizeRouter = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.size.findMany();
	}),
	create: adminProcedure
		.input(
			z.object({
				size: z.string().nonempty(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.size.create({
				data: {
					size: input.size,
				},
			});
		}),
});
