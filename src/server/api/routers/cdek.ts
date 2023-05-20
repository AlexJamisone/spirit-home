/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

type Points = {
	name: string;
	work_time: string;
	phone?: string;
	email: string;
	type: string;
	location: {
		region: string;
		city: string;
		longitude: number;
		latitude: number;
		address: string;
	};
};

export const cdekRouter = createTRPCRouter({
	get: publicProcedure.query(async () => {
		const response = await fetch(
			`https://api.edu.cdek.ru/v2/deliverypoints?postal_code=299000`,
			{
				headers: {
					Authorization: `Bearer ${process.env.CDEK_TOKEN as string}`,
				},
			}
		);
		const data = await response.json();
		const points: Points[] = data.map(
			(value: {
				name: string;
				email: string;
				phone: { number: string }[];
				type: string;
				work_time: string;
				location: {
					region: string;
					city: string;
					longitude: number;
					latitude: number;
					address: string;
				};
			}) => ({
				name: value.name,
				email: value.email,
				phone: value?.phone?.[0]?.number,
				type: value.type,
				work_time: value.work_time,
				location: value.location,
			})
		);
		console.log(points);
		return points;
	}),
});
