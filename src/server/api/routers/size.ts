import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from '~/server/api/trpc';

export const sizeRouter = createTRPCRouter({
	create: adminProcedure
		.input(
			z.object({
				size: z.string().nonempty({message: 'Здесь пусто 😢'}),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.size.create({
				data: {
					quantity: 0,
					title: input.size,
				},
			});
		}),
	get: adminProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.size.findMany();
	}),
	updateQuantity: adminProcedure
		.input(
			z.object({
				quantity: z.number().nonnegative(),
				idSize: z.string(),
				idProduct: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.size.update({
				where: {
					id: input.idSize,
				},
				data: {
					quantity: input.quantity,
					product: {
						connect: { id: input.idProduct },
					},
				},
			});
		}),
	getQuantityByProductId: publicProcedure
		.input(
			z.object({
				idProduct: z.string(),
				idSize: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			return await ctx.prisma.size.findUnique({
				where: {
					id: input.idSize,
				},
				include: {
					product: {
						where: {
							id: input.idProduct,
						},
					},
				},
			});
		}),
});
