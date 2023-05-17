import type {
	Order,
	OrderItem,
	Product,
	ProductPriceHistory,
} from '@prisma/client';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';
import type { ContextType } from './orders';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs().format();

function findEffectivePrice(
	orders: (Order & {
		orderItem: (OrderItem & {
			product: Product & {
				priceHistory: ProductPriceHistory[];
			};
		})[];
	})[]
): number {
	return orders.reduce((total, order) => {
		return (
			total +
			order.orderItem.reduce((orderTotal, orderItem) => {
				const product = orderItem.product;
				const findPrice = product.priceHistory.find(
					(price) => price.effectiveFrom <= order.createdAt
				);
				const price = findPrice ? findPrice.price : 0;
				return orderTotal + orderItem.quantity * price;
			}, 0)
		);
	}, 0);
}

async function dbOrders(
	ctx: ContextType,
	selectedDate: Date[],
	startOfMount: dayjs.Dayjs,
	prevMonthStart: dayjs.Dayjs,
	prevMonthEnd: dayjs.Dayjs,
	thisMonthStart: dayjs.Dayjs
) {
	const orders = ctx.prisma.order.findMany({
		where: {
			createdAt: {
				gte: selectedDate[0],
				lte: selectedDate[1],
			},
		},
		select: {
			createdAt: true,
			status: true,
			orderItem: {
				include: {
					product: {
						include: {
							priceHistory: {
								orderBy: {
									effectiveFrom: 'desc',
								},
							},
						},
					},
				},
			},
		},
	});
	const stat = ctx.prisma.order.findMany({
		where: {
			createdAt: {
				gte: startOfMount.toDate(),
			},
			NOT: {
				status: 'CANCELLED',
			},
		},
		include: {
			orderItem: {
				include: {
					product: {
						include: {
							priceHistory: {
								orderBy: {
									effectiveFrom: 'desc',
								},
							},
						},
					},
				},
			},
		},
	});
	const prevMonthOrders = ctx.prisma.order.findMany({
		where: {
			createdAt: {
				gte: prevMonthStart.toDate(),
				lte: prevMonthEnd.toDate(),
			},
			NOT: {
				status: 'CANCELLED',
			},
		},
		include: {
			orderItem: {
				include: {
					product: {
						include: {
							priceHistory: {
								orderBy: {
									effectiveFrom: 'desc',
								},
							},
						},
					},
				},
			},
		},
	});
	const thisMonthsOrdersWithItems = ctx.prisma.order.findMany({
		where: {
			createdAt: {
				gte: thisMonthStart.toDate(),
			},
			NOT: {
				status: 'CANCELLED',
			},
		},
		include: {
			orderItem: {
				include: {
					product: {
						include: {
							priceHistory: {
								orderBy: {
									effectiveFrom: 'desc',
								},
							},
						},
					},
				},
			},
		},
	});
	const yestadayOrder = ctx.prisma.order.findMany({
		where: {
			createdAt: {
				gte: dayjs().subtract(1, 'day').startOf('day').toDate(),
				lte: dayjs().subtract(1, 'day').endOf('day').toDate(),
			},
			NOT: {
				status: 'CANCELLED',
			},
		},
		include: {
			orderItem: {
				include: {
					product: {
						include: {
							priceHistory: {
								orderBy: {
									effectiveFrom: 'desc',
								},
							},
						},
					},
				},
			},
		},
	});
	const [charts, statictic, prevMonth, thismMOrderItems, yestadayOrders] =
		await ctx.prisma.$transaction([
			orders,
			stat,
			prevMonthOrders,
			thisMonthsOrdersWithItems,
			yestadayOrder,
		]);
	return {
		charts,
		statictic,
		prevMonth,
		thismMOrderItems,
		yestadayOrders,
	};
}

export const chartsRouter = createTRPCRouter({
	get: adminProcedure
		.input(z.object({ selectedDate: z.array(z.date()) }))
		.query(async ({ ctx, input }) => {
			const defultStatOfMonth = dayjs().startOf('month');
			const defaultEndOfMonth = dayjs().endOf('month');
			const prevMonthStart = dayjs()
				.subtract(1, 'month')
				.startOf('month');
			const prevMothEnd = dayjs().subtract(1, 'month').endOf('month');

			const dates = [];
			for (
				let date = dayjs(input.selectedDate[0] || defultStatOfMonth);
				date.isSameOrBefore(input.selectedDate[1] || defaultEndOfMonth);
				date = date.add(1, 'day')
			) {
				dates.push(dayjs(date).format('D MMM'));
			}

			const {
				charts,
				prevMonth,
				statictic,
				thismMOrderItems,
				yestadayOrders,
			} = await dbOrders(
				ctx,
				input.selectedDate,
				defultStatOfMonth,
				prevMonthStart,
				prevMothEnd,
				defultStatOfMonth
			);

			let jamisonRevenue = 0;
			let todayRevenue = 0;
			let todayDifrByDay = 0;
			let todayDifrByJamison = 0;
			let monthRevenue = 0;
			let prevMonthCompare = 0;
			//monthRevenu
			monthRevenue = findEffectivePrice(thismMOrderItems);
			//stat
			statictic.forEach((order) => {
				let orderRevenu = 0;
				order.orderItem.forEach((orderItem) => {
					const findPrice = orderItem.product.priceHistory.find(
						(price) => price.effectiveFrom <= order.createdAt
					);
					const price = findPrice ? findPrice.price : 0;
					orderRevenu += orderItem.quantity * price;
				});
				if (dayjs(order.createdAt).isSame(dayjs(), 'day')) {
					todayRevenue += orderRevenu;
				}
				jamisonRevenue += orderRevenu;
			});
			//compair with prev day

			const yestadayTotal = findEffectivePrice(yestadayOrders);
			if (yestadayTotal > 0) {
				const different = todayRevenue - yestadayTotal;
				todayDifrByDay = (different / yestadayTotal) * 100;
			}

			//compair of month Jamison

			const prevMonthTotal = findEffectivePrice(prevMonth);
			if (prevMonthTotal > 0) {
				const differentJamison =
					jamisonRevenue * 0.1 - prevMonthTotal * 0.1;
				const differentRevenu = monthRevenue - prevMonthTotal;
				todayDifrByJamison =
					(differentJamison / (prevMonthTotal * 0.1)) * 100;
				prevMonthCompare = (differentRevenu / prevMonthTotal) * 100;
			}

			//charts
			const counts: {
				[key: string]: {
					revenu: number;
					orders: number;
					cancelOrders: number;
				};
			} = {};
			charts.forEach((order) => {
				const date = dayjs(order.createdAt).format('D MMM');
				const orderStats = counts[date] || {
					revenu: 0,
					orders: 0,
					cancelOrders: 0,
				};
				if (order.status === 'CANCELLED') {
					orderStats.cancelOrders++;
				} else {
					order.orderItem.forEach((orderItem) => {
						const findPrice = orderItem.product.priceHistory.find(
							(price) => price.effectiveFrom <= order.createdAt
						);
						const price = findPrice ? findPrice.price : 0;
						orderStats.revenu += orderItem.quantity * price;
					});
					orderStats.orders++;
				}
				counts[date] = orderStats;
			});
			const chartData = dates.map((date) => ({
				date,
				Заказы: counts[date]?.orders || 0,
				'Отмененые заказы': counts[date]?.cancelOrders || 0,
				Выручка: counts[date]?.revenu ?? 0,
			}));
			return {
				data: chartData,
				today: todayRevenue,
				todayDifrByDay,
				jamison: jamisonRevenue * 0.1,
				todayDifrByJamison,
				monthRevenue,
				prevMonthCompare,
			};
		}),
});
