import { DiscountType, ProtectionType } from '@prisma/client';
import { z } from 'zod';
import { adminProcedure, createTRPCRouter, publicProcedure } from '../trpc';
export const discountRoute = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.discount.findMany({});
	}),
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
				path: z
					.object({
						catIds: z.array(z.string()),
						productIds: z.array(z.string()),
					})
					.refine(
						(data) =>
							(data.catIds.length > 0 ||
							data.productIds.length > 0) ||
							(data.catIds.length > 1 &&
								data.productIds.length > 1),
						'Нужно выбрать либо продукт, либо категорию'
					),
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
					value: input.value,
					categoryIds: input.path.catIds,
					productId: input.path.productIds,
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
	confirm: publicProcedure
		.input(z.object({ promo: z.string() }))
		.mutation(async ({ input, ctx }) => {
			const promo = await ctx.prisma.discount.findUnique({
				where: {
					code: input.promo,
				},
			});
			if (!promo) {
				return {
					find: false,
					message: 'Промокод не найдет',
				};
			}
			if (promo.protection === 'AUTH' && !ctx.userId) {
				return {
					find: true,
					message:
						'Промокод только для зарегестрированных пользователей',
				};
			}
			let ids: string[] = [];
			if (promo.categoryIds.length > 0) {
				const categorys = await ctx.prisma.category.findMany({
					where: {
						id: {
							in: promo.categoryIds,
						},
					},
					select: {
						product: {
							select: {
								id: true,
							},
						},
					},
				});
				if (categorys.length === 0) {
					const subCategorys = await ctx.prisma.subCategory.findMany({
						where: {
							id: {
								in: promo.categoryIds,
							},
						},
						select: {
							product: {
								select: {
									id: true,
								},
							},
						},
					});
					ids = subCategorys.flatMap((item) =>
						item.product.map((product) => product.id)
					);
				} else {
					ids = categorys.flatMap((item) =>
						item.product.map((product) => product.id)
					);
				}
			}
			return {
				find: true,
				message: 'Промокод активирован!',
				ids: ids.length !== 0 ? ids : promo.productId,
				type: promo.type,
				value: promo.value,
				id: promo.id,
			};
		}),
});
