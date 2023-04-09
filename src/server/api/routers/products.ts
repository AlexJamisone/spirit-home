import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
	createTRPCRouter,
	privetProcedure,
	publicProcedure,
} from '~/server/api/trpc';
import { supabase } from '~/utils/supabase';

export const productsRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		const products = await ctx.prisma.product.findMany();
		return products;
	}),
	create: privetProcedure
		.input(
			z.object({
				name: z.string().nonempty(),
				description: z.string().nonempty(),
				price: z.number().nonnegative(),
				image: z.string().nonempty(),
				category: z.string().nonempty(),
				quantity: z.number().nonnegative(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const createProduct = await ctx.prisma.product.create({
				data: {
					name: input.name,
					description: input.description,
					price: input.price,
					image: input.image,
					categoryTitle: input.category,
					quantity: input.quantity,
				},
			});
			return createProduct;
		}),
	delete: privetProcedure
		.input(
			z.object({
				path: z.string(),
				id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			await supabase.storage.from('products').remove([input.path]);
			return await ctx.prisma.product.delete({
				where: {
					id: input.id,
				},
			});
		}),
	// update: privetProcedure.input(
	// 	z.object({
	// 		name: z.string().nonempty(),
	// 		description: z.string().nonempty(),
	// 		price: z.number().nonnegative(),
	// 		image: z.string().nonempty(),
	// 		category: z.string().nonempty(),
	// 		quantity: z.number().nonnegative(),
	// 	})
	// ).mutation(async({ctx, input}) => {

	// }),
});