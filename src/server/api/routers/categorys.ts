import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
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
	create: adminProcedure
		.input(
			z.object({
				title: z.string().nonempty({ message: 'Укажи категорию' }),
				path: z
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
			const create = await ctx.prisma.category.create({
				data: {
					path: input.path,
					title: input.title,
					createdById: ctx.userId as string,
				},
			});
			return create;
		}),
	createSubCategory: adminProcedure
		.input(
			z.object({
				categoryId: z.string().nonempty(),
				title: z
					.string()
					.nonempty({ message: 'Укажи подкатегорию' })
					.trim(),
				path: z
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
					categoryId: input.categoryId,
					path: input.path,
					title: input.title,
				},
			});
		}),
	updateSubCategory: adminProcedure
		.input(
			z.object({
				id: z.string().nonempty(),
				title: z.string().trim().nonempty(),
				path: z
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
					title: input.title,
					path: input.path,
				},
			});
		}),
	delete: adminProcedure
		.input(z.object({ id: z.string().nonempty() }))
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.category.delete({
				where: {
					id: input.id,
				},
			});
		}),
	deletSubCat: adminProcedure
		.input(
			z.object({
				subId: z.string().nonempty(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.subCategory.delete({
				where: {
					id: input.subId,
				},
			});
		}),
	update: adminProcedure
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
	getCategoryForDiscount: adminProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.category.findMany({
			include: {
				subCategory: true,
			},
		});
	}),
});
