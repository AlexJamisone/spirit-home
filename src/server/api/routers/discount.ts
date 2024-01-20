import { DiscountType, ProtectionType } from '@prisma/client';
import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from '../trpc';
export const discountRoute = createTRPCRouter({
	create: adminProcedure
		.input(
			z.object({
                date: z.tuple([z.date(), z.date()]),
				code: z
					.string()
					.nonempty({
						message: 'Придумай пожалуйста код для скидки',
					}),
				type: z.custom<DiscountType>(),
				protection: z.custom<ProtectionType>(),
				value: z.number().positive({ message: 'Должно быть больше 0' }),
				max: z.number().positive({ message: 'Должно быть больше 0' }).optional(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const create = await ctx.prisma.discount.create({
				data: {
					start: input.date[0],
					end: input.date[1],
                    max: input.max,
                    code: input.code,
                    type: input.type,
                    protection: input.protection,
                    value: input.value
				},
			});
            if(!create) return {
                msg: 'Не получилось создать акцию',
                success: false
            }
            return {
                msg: `Акция с кодом ${input.code} успешно создана`,
                success: true
            }
		}),
});
