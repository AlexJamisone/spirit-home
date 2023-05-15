import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs().locale('ru').format();

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
			//monthRevenu

			const thisMonthOrders = thismMOrderItems.filter((order) => {
				const orderData = dayjs(order.createdAt);
				return (
					orderData.isSameOrAfter(thisMonthStart, 'day') &&
					orderData.isBefore(dayjs(), 'day') &&
					order.status !== 'CANCELLED'
				);
			});
			const thisMonthRevenu = thisMonthOrders.reduce((total, order) => {
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
			monthRevenue = thisMonthRevenu;

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
			const yestadayOrders = statictic.filter((order) => {
				return (
					dayjs(order.createdAt).isSame(yestaday, 'day') &&
					order.status !== 'CANCELLED'
				);
			});
			const yestadayTotal = yestadayOrders.reduce((total, order) => {
				return (
					total +
					order.orderItem.reduce((acc, current) => {
						const effectivePrice =
							current.product.priceHistory.find(
								(history) =>
									history.effectiveFrom <= order.createdAt
							);
						const price = effectivePrice ? effectivePrice.price : 0;
						return acc + price * current.quantity;
					}, 0)
				);
			}, 0);
			if (yestadayTotal > 0) {
				const different = todayRevenue - yestadayTotal;
				todayDifrByDay = (different / yestadayTotal) * 100;
			}

			//compair of month Jamison
			const prevMontsOrder = prevMonth.filter((order) => {
				return (
					dayjs(order.createdAt).isBetween(
						prevMonthStart,
						prevMothEnd,
						null,
						'[]'
					) && order.status !== 'CANCELLED'
				);
			});
			const prevMonthTotal = prevMontsOrder.reduce((total, order) => {
				return (
					total +
					order.orderItem.reduce((acc, current) => {
						const effectivePrice =
							current.product.priceHistory.find(
								(history) =>
									history.effectiveFrom <= order.createdAt
							);
						const price = effectivePrice ? effectivePrice.price : 0;
						return acc + price * current.quantity;
					}, 0)
				);
			}, 0);
			if (prevMonthTotal > 0) {
				const different = jamisonRevenue * 0.1 - prevMonthTotal * 0.1;
				todayDifrByJamison = (different / (prevMonthTotal * 0.1)) * 100;
			}

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
			};
		}),
});
