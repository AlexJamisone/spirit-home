import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from '~/server/api/trpc';
import { utapi } from '~/server/uploadthings';

export const productsRouter = createTRPCRouter({
	getByFavorites: publicProcedure
		.input(
			z.object({
				ids: z.array(z.string()),
			})
		)
		.query(async ({ ctx, input }) => {
			if (input.ids.length === 0) return null;
			return await ctx.prisma.product.findMany({
				where: {
					id: {
						in: input.ids,
					},
					NOT: {
						archived: true,
					},
				},
				include: {
					subCategory: {
						include: {
							category: true,
						},
					},
					category: true,
					size: true,
				},
			});
		}),
	getSinglProduct: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			return await ctx.prisma.product.findFirst({
				where: {
					id: input.id,
					NOT: {
						archived: true,
					},
				},
				include: {
					size: true,
				},
			});
		}),
	getForAll: publicProcedure
		.input(
			z.object({
				limit: z.number(),
				cursor: z.string().nullish(),
				search: z.string().optional(),
			})
		)
		.query(async ({ ctx, input }) => {
			const { limit, cursor } = input;
			const items = await ctx.prisma.product.findMany({
				include: {
					size: true,
					category: true,
					subCategory: true,
				},
				take: limit + 1,
				cursor: cursor
					? {
							id: cursor,
					  }
					: undefined,
				where: {
					name: {
						contains: input.search,
						mode: 'insensitive',
					},
				},
			});
			let nextCursor: typeof cursor | undefined;
			if (items.length > limit) {
				const nextItem = items.pop();
				nextCursor = nextItem?.id;
			}

			return {
				items,
				nextCursor,
			};
		}),
	getForAdmin: publicProcedure.query(async ({ ctx }) => {
		const products = await ctx.prisma.product.findMany({
			include: {
				subCategory: {
					include: {
						category: true,
					},
				},
				category: true,
				size: true,
			},
		});
		return products;
	}),
	create: adminProcedure
		.input(
			z.object({
				name: z
					.string()
					.nonempty({ message: 'Придумай название продукту' }),
				description: z
					.array(z.string())
					.min(1, { message: 'Заполни описание!' }),
				price: z
					.number()
					.nonnegative({ message: 'Укажи положительное число' }),
				image: z.array(z.string()).min(1, {
					message:
						"Кажется ты не нажал кнопку 'Upload' или не добавил фото",
				}),
				category: z.object({
					id: z.string().nonempty({ message: 'Выберите категорию' }),
					sub: z.boolean(),
				}),
				size: z.array(z.string()),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const size = input.size.map((size) => ({ id: size }));
			if (input.category.sub) {
				return await ctx.prisma.product.create({
					data: {
						name: input.name,
						description: input.description.filter(Boolean),
						image: input.image,
						size: {
							connect: size,
						},
						subCategory: {
							connect: {
								id: input.category.id,
							},
						},
						price: input.price,
					},
				});
			} else {
				return await ctx.prisma.product.create({
					data: {
						name: input.name,
						description: input.description,
						image: input.image,
						size: {
							connect: size,
						},
						category: {
							connect: {
								id: input.category.id,
							},
						},
						price: input.price,
					},
				});
			}
		}),
	archived: adminProcedure
		.input(
			z.object({
				id: z.string(),
				action: z.boolean(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.product.update({
				where: {
					id: input.id,
				},
				data: {
					archived: input.action,
				},
			});
		}),
	delete: adminProcedure
		.input(
			z.object({
				path: z.array(z.string()),
				id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			await utapi.deleteFiles(input.path);

			return await ctx.prisma.product.delete({
				where: {
					id: input.id,
				},
			});
		}),
	deletImage: adminProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			const del = await utapi.deleteFiles(input.id);
			return del.success;
		}),
	update: adminProcedure
		.input(
			z.object({
				id: z.string().nonempty(),
				name: z.string().nonempty(),
				description: z
					.array(z.string())
					.min(1, { message: 'Заполни Описание' }),
				price: z.number().nonnegative(),
				image: z.array(z.string()),
				category: z.object({
					id: z.string().nonempty(),
					sub: z.boolean(),
				}),
				size: z.array(z.string()),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const size = input.size.map((size) => ({ id: size }));
			if (input.category.sub) {
				return await ctx.prisma.product.update({
					where: {
						id: input.id,
					},
					data: {
						name: input.name,
						description: input.description.filter(Boolean),
						image: input.image,
						subCategory: {
							connect: {
								id: input.category.id,
							},
						},
						category: {
							disconnect: true,
						},
						size: {
							set: size,
						},
					},
				});
			} else {
				return await ctx.prisma.product.update({
					where: {
						id: input.id,
					},
					data: {
						name: input.name,
						description: input.description,
						image: input.image,
						category: {
							connect: {
								id: input.category.id,
							},
						},
						subCategory: {
							disconnect: true,
						},
						size: {
							set: size,
						},
					},
				});
			}
		}),
	getByCategory: publicProcedure
		.input(
			z.object({
				category: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			return await ctx.prisma.product.findMany({
				where: {
					OR: [
						{
							category: {
								path: input.category,
							},
						},
						{
							subCategory: {
								path: input.category,
							},
						},
					],
					NOT: {
						archived: true,
					},
				},
				include: {
					size: true,
					category: true,
					subCategory: true,
				},
			});
		}),
	getWithSearch: adminProcedure
		.input(z.object({ search: z.string().optional() }))
		.query(async ({ input, ctx }) => {
			if (input.search && input.search !== '') {
				return await ctx.prisma.product.findMany({
					where: {
						name: {
							contains: input.search,
							mode: 'insensitive',
						},
					},
                    include: {
                        subCategory: true
                    }
				});
			} else {
				return await ctx.prisma.product.findMany({
					take: 10,
                    include: {
                        subCategory: true
                    }
				});
			}
		}),
});
