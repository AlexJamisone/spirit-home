import { clerkClient } from '@clerk/nextjs/server';
import type { Point } from '@prisma/client';
import { z } from 'zod';
import { createTRPCRouter, privetProcedure } from '~/server/api/trpc';

export const addressesRouter = createTRPCRouter({
	createByUser: privetProcedure
		.input(
			z.object({
				firstName: z.string().nonempty(),
				lastName: z.string().nonempty(),
				contactPhone: z.string().nonempty().min(16),
				point: z.custom<Point>(),
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
					point: {
						create: {
							name: input.point.name,
							addressFullName: input.point.addressFullName,
							addressName: input.point.addressName,
							city: input.point.city,
							email: input.point.email,
							region: input.point.region,
							latitude: input.point.latitude,
							longitude: input.point.longitude,
							type: input.point.type,
							work_time: input.point.work_time,
							phone: input.point.phone,
						},
					},
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
				contactPhone: z.string().nonempty().min(12).max(12),
				point: z.custom<Point>(),
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
					point: {
						update: {
							name: input.point.name,
							addressFullName: input.point.addressFullName,
							addressName: input.point.addressName,
							city: input.point.city,
							email: input.point.email,
							region: input.point.region,
							latitude: input.point.latitude,
							longitude: input.point.longitude,
							type: input.point.type,
							work_time: input.point.work_time,
							phone: input.point.phone,
						},
					},
				},
			});
		}),
});
