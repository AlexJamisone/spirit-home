import { utapi } from 'uploadthing/server';
import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	privetProcedure,
	publicProcedure,
} from '~/server/api/trpc';

export const productsRouter = createTRPCRouter({
	getByFavorites: publicProcedure
		.input(
			z.object({
				id: z.array(z.string()),
			})
		)
		.query(async ({ ctx, input }) => {
			if (input.id.length === 0) return null;
			return await ctx.prisma.product.findMany({
				where: {
					id: {
						in: input.id,
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
			});
		}),
	getForAll: publicProcedure.query(async ({ ctx }) => {
		const products = await ctx.prisma.product.findMany({
			include: {
				size: true,
				category: true,
				subCategory: true,
			},
			where: {
				NOT: {
					archived: true,
				},
			},
		});
		return products;
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
					.string()
					.nonempty({ message: 'Заполни описание' }),
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
						description: input.description,
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
	deletImage: privetProcedure
		.input(z.array(z.string()))
		.mutation(({ input }) => {
			const res = Promise.all(
				input.map(async (fileName) => {
					await utapi.deleteFiles(fileName);
				})
			);
			return res;
		}),
	update: adminProcedure
		.input(
			z.object({
				id: z.string().nonempty(),
				name: z.string().nonempty(),
				description: z.string().nonempty(),
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
						description: input.description,
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
});
