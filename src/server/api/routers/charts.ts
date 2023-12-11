import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { z } from 'zod';
import { diffrence } from '~/helpers/diffrence';
import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs().format();

export const chartsRouter = createTRPCRouter({
	range: adminProcedure
		.input(z.object({ selectedDate: z.array(z.date()) }))
		.query(async ({ ctx, input }) => {
			const defultStratOfMonth = dayjs().startOf('month');
			const defaultEndOfMonth = dayjs().endOf('month');
			const dates = [];
			for (
				let date = dayjs(input.selectedDate[0] || defultStratOfMonth);
				date.isSameOrBefore(input.selectedDate[1] || defaultEndOfMonth);
				date = date.add(1, 'day')
			) {
				dates.push(dayjs(date).format('D MMM'));
			}
			const orders = await ctx.prisma.order.findMany({
				where: {
					OR: [
						{
							createdAt: {
								gte: input.selectedDate[0],
								lte: input.selectedDate[1],
							},
						},
						{
							createdAt: {
								gte: defultStratOfMonth.toDate(),
								lte: defaultEndOfMonth.toDate(),
							},
						},
					],
				},
			});

			const counts: {
				[key: string]: {
					revenu: number;
					orders: number;
					cancelOrders: number;
				};
			} = {};
			orders.forEach((order) => {
				const date = dayjs(order.createdAt).format('D MMM');
				const orderStatus = counts[date] || {
					revenu: 0,
					orders: 0,
					cancelOrders: 0,
				};
				if (order.status === 'CANCELLED') {
					orderStatus.cancelOrders++;
				} else {
					orderStatus.revenu += order.total;
					orderStatus.orders++;
				}
				counts[date] = orderStatus;
			});
			const charts = dates.map((date) => ({
				date,
				Заказы: counts[date]?.orders || 0,
				Отмены: counts[date]?.cancelOrders || 0,
				Выручка: counts[date]?.revenu || 0,
			}));

			return {
				data: charts,
			};
		}),
	static: adminProcedure.query(async ({ ctx }) => {
		const start = dayjs().startOf('month');
		const end = dayjs().endOf('month');
		const prevMonthStart = dayjs().subtract(1, 'month').startOf('month');
		const prevMothEnd = dayjs().subtract(1, 'month').endOf('month');
		const yestaday = dayjs().subtract(1, 'day');
		const todayOrder = await ctx.prisma.order.findMany({
			where: {
				createdAt: {
					gte: dayjs().startOf('day').toDate(),
					lte: dayjs().endOf('day').toDate(),
				},
			},
		});
		const yestadayOrder = await ctx.prisma.order.findMany({
			where: {
				createdAt: {
					gte: yestaday.startOf('day').toDate(),
					lte: yestaday.endOf('day').toDate(),
				},
			},
		});
		const prevMonthOrders = await ctx.prisma.order.findMany({
			where: {
				createdAt: {
					gte: prevMonthStart.toDate(),
					lte: prevMothEnd.toDate(),
				},
			},
		});
		const currentMonth = await ctx.prisma.order.findMany({
			where: {
				createdAt: {
					gte: start.toDate(),
					lte: end.toDate(),
				},
			},
		});
		const revenu = currentMonth.reduce(
			(acc, current) => acc + current.total,
			0
		);
		const jamisonRevenu = revenu * 0.1;
		const oliRevenu = revenu * 0.05;
		const prevMonthRevenu = prevMonthOrders.reduce(
			(acc, current) => acc + current.total,
			0
		);
		const currentMonthRevenu = currentMonth.reduce(
			(acc, current) => acc + current.total,
			0
		);
		const todayRevenu = todayOrder.reduce(
			(acc, order) => acc + order.total,
			0
		);
		const yestadayRevenu = yestadayOrder.reduce(
			(acc, order) => acc + order.total,
			0
		);
		return {
			jamison: jamisonRevenu,
			oli: oliRevenu,
			diffrence: {
				oli: diffrence(currentMonthRevenu, prevMonthRevenu, 5),
				jamison: diffrence(currentMonthRevenu, prevMonthRevenu, 10),
				rev: diffrence(todayRevenu, yestadayRevenu),
			},
			todayRevenu,
		};
	}),
});
