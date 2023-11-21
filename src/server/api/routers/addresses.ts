import { clerkClient } from '@clerk/nextjs/server';
import { z } from 'zod';
import { createTRPCRouter, privetProcedure } from '~/server/api/trpc';

export const addressesRouter = createTRPCRouter({
	createByUser: privetProcedure
		.input(
			z.object({
				firstName: z.string().nonempty(),
				lastName: z.string().nonempty(),
				contactPhone: z.string().nonempty().min(16),
				point: z.string(),
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
					contactPhone: input.contactPhone,
					point: input.point,
					userId: ctx.userId,
					firstName: input.firstName,
					lastName: input.lastName,
				},
			});
		}),
	archived: privetProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ input, ctx }) => {
			const archiveAddress = await ctx.prisma.address.update({
				where: {
					id: input.id,
				},
				data: {
					archived: {
						set: true,
					},
				},
			});
			return archiveAddress;
		}),
	update: privetProcedure
		.input(
			z.object({
				id: z.string(),
				firstName: z.string().nonempty().optional(),
				lastName: z.string().nonempty().optional(),
				contactPhone: z.string().nonempty().min(16),
				point: z.string(),
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
					contactPhone: input.contactPhone,
					point: input.point,
				},
			});
		}),
});
