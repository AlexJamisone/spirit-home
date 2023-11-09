import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from '~/server/api/trpc';

export const sizeRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.size.findMany();
	}),
	create: adminProcedure
		.input(
			z.object({
				size: z
					.string()
					.nonempty({
						message: 'Заполни строку, например 16 или xs',
					})
					.trim(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const size = await ctx.prisma.size.findMany();
			size.map(({ value }) => {
				if (value === input.size) {
					throw new TRPCError({
						code: 'CONFLICT',
						message: 'Данный размер уже существует',
					});
				}
			});
			return await ctx.prisma.size.create({
				data: {
					value: input.size,
				},
			});
		}),
});
