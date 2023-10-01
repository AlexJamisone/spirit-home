import { utapi } from 'uploadthing/server';
import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	privetProcedure,
	publicProcedure,
} from '~/server/api/trpc';

export const productsRouter = createTRPCRouter({
	getForAll: publicProcedure.query(async ({ ctx }) => {
		const products = await ctx.prisma.product.findMany({
			include: {
				priceHistory: {
					orderBy: {
						effectiveFrom: 'desc',
					},
				},
				quantity: {
					include: {
						size: true,
					},
				},
				subCategory: {
					include: {
						category: true,
					},
				},
				category: true,
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
				priceHistory: {
					orderBy: {
						effectiveFrom: 'desc',
					},
				},
				quantity: {
					include: {
						size: true,
					},
				},
				subCategory: {
					include: {
						category: true,
					},
				},
				category: true,
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
				quantity: z.array(
					z.object({
						sizeId: z.string(),
						quantity: z.number(),
					})
				),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const quantity = input.quantity.map(({ quantity, sizeId }) => ({
				value: quantity,
				sizeId,
			}));
			const sizeId = input.quantity.map(({ sizeId }) => ({
				id: sizeId,
			}));
			if (input.category.sub) {
				return await ctx.prisma.product.create({
					data: {
						name: input.name,
						description: input.description,
						priceHistory: {
							create: {
								price: input.price,
							},
						},
						image: input.image,
						quantity: {
							createMany: {
								data: quantity,
							},
						},
						size: {
							connect: sizeId,
						},
						subCategory: {
							connect: {
								id: input.category.id,
							},
						},
					},
				});
			} else {
				return await ctx.prisma.product.create({
					data: {
						name: input.name,
						description: input.description,
						priceHistory: {
							create: {
								price: input.price,
							},
						},
						image: input.image,
						quantity: {
							createMany: {
								data: quantity,
							},
						},
						size: {
							connect: sizeId,
						},
						category: {
							connect: {
								id: input.category.id,
							},
						},
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
	update: privetProcedure
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
				quantity: z.array(
					z.object({
						id: z.string(),
						sizeId: z.string(),
						quantity: z.number(),
					})
				),
			})
		)
		.mutation(async ({ ctx, input }) => {
			input.quantity.map(async ({ quantity, id }) => {
				return await ctx.prisma.quantity.update({
					data: {
						value: quantity,
					},
					where: {
						id,
					},
				});
			});
			const product = await ctx.prisma.product.findUnique({
				where: {
					id: input.id,
				},
				include: {
					priceHistory: {
						orderBy: {
							effectiveFrom: 'desc',
						},
					},
				},
			});

			if (input.category.sub) {
				if (input.price === product?.priceHistory[0]?.price) {
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
							priceHistory: {
								create: {
									price: input.price,
								},
							},
							subCategory: {
								connect: {
									id: input.category.id,
								},
							},
						},
					});
				}
			} else {
				if (input.price === product?.priceHistory[0]?.price) {
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
							priceHistory: {
								create: {
									price: input.price,
								},
							},
							category: {
								connect: {
									id: input.category.id,
								},
							},
							subCategory: {
								disconnect: true,
							},
						},
					});
				}
			}
		}),
});
