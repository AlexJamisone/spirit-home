import { z } from 'zod';
import type { Size } from '~/reducer/FormReducer';
import {
	adminProcedure,
	createTRPCRouter,
	privetProcedure,
	publicProcedure,
} from '~/server/api/trpc';
import { supabase } from '~/utils/supabase';
import type { UploadResult } from '~/utils/uploadImage';

export const productsRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		const products = await ctx.prisma.product.findMany({
			include: {
				priceHistory: {
					orderBy: {
						effectiveFrom: 'desc',
					},
				},
				size: {
					include: {
						quantity: {
							select: {
								value: true,
							},
						},
					},
				},
			},
		});
		return products;
	}),
	create: adminProcedure
		.input(
			z.object({
				name: z.string().nonempty(),
				description: z.string().nonempty(),
				price: z.number().nonnegative(),
				image: z.array(z.string()),
				category: z.string().nonempty(),
				size: z.custom<Size[]>(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const size = input.size.map(({ quantity, id }) => ({
				value: quantity ?? 0,
				sizeId: id,
			}));
			const sizeId = input.size.map(({id}) => ({
				id
			}))
			const createProduct = await ctx.prisma.product.create({
				data: {
					name: input.name,
					description: input.description,
					priceHistory: {
						create: {
							price: input.price,
						},
					},
					image: input.image,
					categoryTitle: input.category,
					quantity: {
						createMany: {
							data: size,
						},
					},
					size: {
						connect: sizeId
					}
				},
			});
			return createProduct;
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
				path: z.array(z.custom<UploadResult>()),
				id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			input.path.map(async ({ path }) => {
				await supabase.storage.from('products').remove([path]);
			});

			return await ctx.prisma.product.delete({
				where: {
					id: input.id,
				},
			});
		}),
	deletImage: privetProcedure
		.input(z.array(z.custom<UploadResult>()))
		.mutation(({ input }) => {
			const res = Promise.all(
				input.map(async ({ path }) => {
					await supabase.storage.from('products').remove([path]);
					return { path, error: null };
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
				category: z.string().nonempty(),
				size: z.custom<Size[]>(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const size = input.size.map(({ quantity, id }) => ({
				value: quantity ?? 0,
				sizeId: id,
			}));
			return await ctx.prisma.product.update({
				where: {
					id: input.id,
				},
				data: {
					name: input.name,
					description: input.description,
					priceHistory: {
						create: {
							price: input.price,
						},
					},
					image: input.image,
					categoryTitle: input.category,
					quantity: {
						deleteMany: {
							productId: input.id,
						},
						createMany: {
							data: size,
						},
					},
				},
			});
		}),
});
