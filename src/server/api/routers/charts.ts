import type {
	Order,
	OrderItem,
	Product,
	ProductPriceHistory,
} from '@prisma/client';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs().locale('ru').format();

function findEffectivePrice(
	orders: (Order & {
		orderItem: (OrderItem & {
			product: Product & {
				priceHistory: ProductPriceHistory[];
			};
		})[];
	})[],
	monthsStart: dayjs.Dayjs
): number {
	return orders
		.filter((order) => {
			const orderDate = dayjs(order.createdAt);
			return (
				orderDate.isSameOrAfter(monthsStart, 'day') &&
				orderDate.isBefore(dayjs(), 'day') &&
				order.status !== 'CANCELLED'
			);
		})
		.reduce((total, order) => {
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

export const chartsRouter = createTRPCRouter({
	get: adminProcedure
		.input(z.object({ selectedDate: z.array(z.date()) }))
		.query(async ({ ctx, input }) => {
			const now = new Date();
			const startOfMount = new Date(now.getFullYear(), now.getMonth(), 1);
			const endOfMonth = new Date(
				now.getFullYear(),
				now.getMonth() + 1,
				0
			);
			const prevMonthStart = dayjs()
				.subtract(1, 'month')
				.startOf('month');
			const prevMothEnd = dayjs().subtract(1, 'month').endOf('month');
			const thisMonthStart = dayjs().startOf('month');

			const dates = [];
			for (
				let date = new Date(input.selectedDate[0] || startOfMount);
				date <= (input.selectedDate[1] || endOfMonth);
				date.setDate(date.getDate() + 1)
			) {
				dates.push(dayjs(date).format('D MMM'));
			}
			const orders = ctx.prisma.order.findMany({
				where: {
					createdAt: {
						gte: input.selectedDate[0],
						lte: input.selectedDate[1],
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
						gte: startOfMount,
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
						lte: prevMothEnd.toDate(),
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

			const [charts, statictic, prevMonth, thismMOrderItems] =
				await ctx.prisma.$transaction([
					orders,
					stat,
					prevMonthOrders,
					thisMonthsOrdersWithItems,
				]);

			let jamisonRevenue = 0;
			let todayRevenue = 0;
			let todayDifrByDay = 0;
			let todayDifrByJamison = 0;
			let monthRevenue = 0;
			let prevMonthCompare = 0;
			//monthRevenu
			monthRevenue = findEffectivePrice(thismMOrderItems, thisMonthStart);
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
				if (order.createdAt.getDate() === now.getDate()) {
					todayRevenue += orderRevenu;
				}
				jamisonRevenue += orderRevenu;
			});
			//compair with prev day
			const yestaday = dayjs().subtract(1, 'day');

			const yestadayTotal = findEffectivePrice(statictic, yestaday);
			if (yestadayTotal > 0) {
				const different = todayRevenue - yestadayTotal;
				todayDifrByDay = (different / yestadayTotal) * 100;
			}

			//compair of month Jamison

			const prevMonthTotal = findEffectivePrice(
				prevMonth,
				prevMonthStart
			);
			if (prevMonthTotal > 0) {
				const differentJamison =
					jamisonRevenue * 0.1 - prevMonthTotal * 0.1;
				const differentRevenu = monthRevenue - prevMonthTotal;
				todayDifrByJamison =
					(differentJamison / (prevMonthTotal * 0.1)) * 100;
				prevMonthCompare = (differentRevenu / prevMonthTotal) * 100;
			}
			//compaier of month Revenu

			//charts
			const counts: {
				[key: string]: {
					revenu: number;
					orders: number;
					cancelOrders: number;
				};
			} = {};
			// const canceledCounts: { [key: string]: number } = {};
			charts.forEach((order) => {
				const date = dayjs(order.createdAt).format('D MMM');
				const orderStats = counts[date] || {
					revenu: 0,
					orders: 0,
					cancelOrders: 0,
				};
				if (order.status === 'CANCELLED') {
					// canceledCounts[date] = (canceledCounts[date] || 0) + 1;
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
