import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	privetProcedure,
	publicProcedure,
} from '~/server/api/trpc';

export const categorysRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.category.findMany({
			include: {
				subCategory: true,
			},
		});
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
			const create = await ctx.prisma.category.create({
				data: {
					path: input.path,
					title: input.title,
					createdById: userId,
				},
			});
			return create;
		}),
	createSubCategory: adminProcedure
		.input(
			z.object({
				id: z.string().nonempty(),
				subTitle: z.string().trim(),
				subPath: z
					.string()
					.trim()
					.regex(/^[a-zA-Z]+$/, {
						message: 'Только английскими буквами',
					})
					.nonempty({ message: 'Здесь пусто :(' })
					.transform((val) => val.toLowerCase()),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.subCategory.create({
				data: {
					categoryId: input.id,
					path: input.subPath,
					title: input.subTitle,
				},
			});
		}),
	updateSubCategory: adminProcedure
		.input(
			z.object({
				id: z.string().nonempty(),
				subTitle: z.string().trim().nonempty(),
				subPath: z
					.string()
					.trim()
					.regex(/^[a-zA-Z]+$/, {
						message: 'Только английскими буквами',
					})
					.nonempty({ message: 'Здесь пусто :(' })
					.transform((val) => val.toLowerCase()),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.subCategory.update({
				where: {
					id: input.id,
				},
				data: {
					title: input.subTitle,
					path: input.subPath,
				},
			});
		}),
	delete: privetProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const deleteCategory = await ctx.prisma.category.delete({
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
			const updateCategory = await ctx.prisma.category.update({
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
