import { z } from 'zod';
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
				quantity: {
					include: {
						size: true,
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
							data: quantity,
						},
					},
					size: {
						connect: sizeId,
					},
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
				},
			});
		}),
});
