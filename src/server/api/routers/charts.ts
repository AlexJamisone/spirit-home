import dayjs from 'dayjs';
import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';
dayjs().locale('ru').format();

export const chartsRouter = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
		const now = new Date();
		const startOfMount = new Date(now.getFullYear(), now.getMonth(), 1);
		const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
		const dates = [];
		for (
			let date = new Date(startOfMount);
			date <= endOfMonth;
			date.setDate(date.getDate() + 1)
		) {
			dates.push(dayjs(date).format('D MMM'));
		}
		const orders = ctx.prisma.order.findMany({
			where: {
				createdAt: {
					gte: startOfMount,
					lte: endOfMonth,
				},
			},
			select: {
				createdAt: true,
				status: true,
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
								priceHistory: true,
							},
						},
					},
				},
			},
		});

		const [charts, statictic] = await ctx.prisma.$transaction([
			orders,
			stat,
		]);

		let jamisonRevenue = 0;
		let todayRevenue = 0;
		let todayDifr = 0;
		//stat
		statictic.forEach((order) => {
			let orderRevenu = 0;
			order.orderItem.forEach((orderItem) => {
				const findPrice = orderItem.product.priceHistory.find(
					(price) =>
						price.effectiveFrom.getDate() <=
						order.createdAt.getDate()
				);
				const price = findPrice ? findPrice.price : 0;
				orderRevenu += orderItem.quantity * price;
			});
			if (order.createdAt.getDate() === now.getDate()) {
				todayRevenue += orderRevenu;
			}
			jamisonRevenue += orderRevenu;
		});
		//compair
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
					const effectivePrice = current.product.priceHistory.find(
						(history) => history.effectiveFrom <= order.createdAt
					);
					const price = effectivePrice ? effectivePrice.price : 0;
					return acc + price * current.quantity;
				}, 0)
			);
		}, 0);
		console.log('вчера', yestadayTotal);
		console.log('сегодня', todayRevenue);
		if (yestadayTotal > 0) {
			const different = todayRevenue - yestadayTotal;
			todayDifr = (different / yestadayTotal) * 100;
		}

		//charts
		const counts: { [key: string]: number } = {};
		const canceledCounts: { [key: string]: number } = {};
		charts.forEach((order) => {
			const date = dayjs(order.createdAt).format('D MMM');
			if (order.status === 'CANCELLED') {
				canceledCounts[date] = (canceledCounts[date] || 0) + 1;
			}
			counts[date] = (counts[date] || 0) + 1;
		});
		const chartData = dates.map((date) => ({
			date,
			'Количество заказов': counts[date] || 0,
			'Отменёные заказы': canceledCounts[date] || 0,
		}));
		return {
			data: chartData,
			today: todayRevenue,
			todayDifr,
			jamison: jamisonRevenue * 0.1,
		};
	}),
});
