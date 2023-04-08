import { TRPCError } from '@trpc/server';
import { string, z } from 'zod';
import {
	createTRPCRouter,
	privetProcedure,
	publicProcedure,
} from '~/server/api/trpc';

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
});
