import { TRPCError } from '@trpc/server';
import { string, z } from 'zod';
import {
	createTRPCRouter,
	privetProcedure,
	publicProcedure,
} from '~/server/api/trpc';

export const categorysRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		const categories = await ctx.prisma.catrgory.findMany();
		return categories;
	}),
	create: privetProcedure
		.input(
			z.object({
				title: z.string().nonempty(),
				path: z.string().nonempty(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { userId } = ctx;
			const create = await ctx.prisma.catrgory.create({
				data: {
					path: input.path,
					title: input.title,
					createdById: userId,
				},
			});
			return create;
		}),
	delete: privetProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const deleteCategory = await ctx.prisma.catrgory.delete({
				where: {
					id: input.id,
				},
			});
			if (!deleteCategory)
				return new TRPCError({
					code: 'NOT_FOUND',
					message: "Can't delet category",
				});
			return deleteCategory;
		}),
	update: privetProcedure
		.input(
			z.object({
				title: z.string().nonempty(),
				path: z.string().nonempty(),
				id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const updateCategory = await ctx.prisma.catrgory.update({
				where: {
					id: input.id,
				},
				data: {
					title: input.title,
					path: input.path,
				},
			});
			if (!updateCategory)
				return new TRPCError({
					code: 'BAD_REQUEST',
					message: "Can't update categorys",
				});
			return updateCategory;
		}),
});
