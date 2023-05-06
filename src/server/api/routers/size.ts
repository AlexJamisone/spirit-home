import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';

export const sizeRouter = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
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
			size.map(({ size }) => {
				if (size === input.size) {
					throw new TRPCError({
						code: 'CONFLICT',
						message: 'Данный размер уже существует',
					});
				}
			});
			return await ctx.prisma.size.create({
				data: {
					size: input.size,
				},
			});
		}),
});
