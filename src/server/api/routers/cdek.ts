/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export type Points = {
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
	getPoints: publicProcedure
		.input(
			z.object({
				city: z.string().nonempty(),
			})
		)
		.mutation(async ({ input }) => {
			const api_req_token = `https://api.edu.cdek.ru/v2/oauth/token?parameters&grant_type=client_credentials&client_id=${
				process.env.CDEK_ID as string
			}&client_secret=${process.env.CDEK_SECRET as string}`;
			const api_url = `https://api.cdek.ru/v2/deliverypoints?postal_code=${input.city}`;

			const req_token = await fetch(api_req_token, {
				method: 'POST',
			});

			const res_token = await req_token.json();
			const token: string = res_token.access_token;

			const response = await fetch(api_url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();

			const points: Points[] = data.map(
				(value: {
					name: string;
					email: string;
					phones: { number: string }[];
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
					phone: value?.phones?.[0]?.number,
					type: value.type,
					work_time: value.work_time,
					location: value.location,
				})
			);
			console.log(data);
			return points;
		}),
});
