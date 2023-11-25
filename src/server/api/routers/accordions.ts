import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from '~/server/api/trpc';

export const accordionsRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.accordion.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});
	}),
	create: adminProcedure
		.input(
			z.object({
				title: z.string().nonempty({ message: 'Придумай вопрос!' }),
				content: z
					.array(z.string())
					.min(1, {
						message: 'Заполни ответ',
					})
					.transform((val) => val.filter(Boolean)),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.accordion.create({
				data: {
					title: input.title,
					content: input.content,
				},
			});
		}),
	update: adminProcedure
		.input(
			z.object({
				id: z.string().nonempty(),
				title: z.string().nonempty({ message: 'Заполни строку' }),
				content: z
					.array(z.string())
					.min(1, { message: 'Не может быть с пустым контентом' }),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.accordion.update({
				where: {
					id: input.id,
				},
				data: {
					title: input.title,
					content: input.content.filter(Boolean),
				},
			});
		}),
	deleteAcc: adminProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.accordion.delete({
				where: {
					id: input.id,
				},
			});
		}),
});
