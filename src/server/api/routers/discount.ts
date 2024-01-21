import { DiscountType, ProtectionType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from '../trpc';
export const discountRoute = createTRPCRouter({
	create: adminProcedure
		.input(
			z.object({
				date: z.tuple([z.date(), z.date()]),
				code: z.string().nonempty({
					message: 'Придумай пожалуйста код для скидки',
				}),
				type: z.custom<DiscountType>(),
				protection: z.custom<ProtectionType>(),
				value: z.number().positive({ message: 'Должно быть больше 0' }),
				max: z
					.number()
					.positive({ message: 'Должно быть больше 0' })
					.optional(),
				catIds: z.array(z.string()),
				productIds: z.array(z.string()),
			})
		)
		.mutation(async ({ input, ctx }) => {
			if (input.catIds.length === 0 && input.productIds.length === 0) {
				return new TRPCError({
					code: 'BAD_REQUEST',
					message:
						'Нужно указать какие товары или категории идут в скидке',
				});
			}
			const create = await ctx.prisma.discount.create({
				data: {
					start: input.date[0],
					end: input.date[1],
					max: input.max,
					code: input.code,
					type: input.type,
					protection: input.protection,
					value: input.value,
					categoryIds: input.catIds,
					productId: input.productIds
				},
			});
			if (!create)
				return {
					msg: 'Не получилось создать акцию',
					success: false,
				};
			return {
				msg: `Акция с кодом ${input.code} успешно создана`,
				success: true,
			};
		}),
});
