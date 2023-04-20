import { clerkClient } from '@clerk/nextjs/server';
import { z } from 'zod';
import { createTRPCRouter, privetProcedure } from '~/server/api/trpc';

export const addressesRouter = createTRPCRouter({
	createByUser: privetProcedure
		.input(
			z.object({
				firstName: z.string().nonempty(),
				lastName: z.string().nonempty(),
				city: z.string().nonempty(),
				contactPhone: z.string().nonempty().min(12).max(12),
				point: z.string().nonempty(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			await clerkClient.users.updateUser(ctx.userId, {
				firstName: input.firstName,
				lastName: input.lastName,
			});
			await ctx.prisma.user.update({
				where: {
					id: ctx.userId,
				},
				data: {
					firstName: input.firstName,
					lastName: input.lastName,
				},
			});
			return await ctx.prisma.address.create({
				data: {
					city: input.city,
					contactPhone: input.contactPhone,
					point: input.point,
					userId: ctx.userId,
					firstName: input.firstName,
					lastName: input.lastName,
				},
			});
		}),
	delete: privetProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ input, ctx }) => {
			return await ctx.prisma.address.delete({
				where: {
					id: input.id,
				},
			});
		}),
	update: privetProcedure
		.input(
			z.object({
				id: z.string(),
				firstName: z.string().nonempty().optional(),
				lastName: z.string().nonempty().optional(),
				city: z.string().nonempty(),
				contactPhone: z.string().nonempty().min(12).max(12),
				point: z.string().nonempty(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			await clerkClient.users.updateUser(ctx.userId, {
				firstName: input.firstName,
				lastName: input.lastName,
			});
			await ctx.prisma.user.update({
				where: {
					id: ctx.userId,
				},
				data: {
					firstName: input.firstName,
					lastName: input.lastName,
				},
			});
			await ctx.prisma.address.update({
				where: {
					id: input.id,
				},
				data: {
					city: input.city,
					contactPhone: input.contactPhone,
					point: input.point,
				},
			});
		}),
});
