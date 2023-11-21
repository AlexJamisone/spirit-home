import axios from 'axios';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

type PointFromApi = {
	name: string;
	work_time: string;
	phones?: [{ number: string }];
	email: string;
	type: string;
	location: {
		region: string;
		city: string;
		longitude: number;
		latitude: number;
		address: string;
		address_full: string;
	};
};
export type FiltredPoint = {
	name: string;
	work_time: string;
	phone?: string;
	email: string;
	type: string;
	region: string;
	city: string;
	longitude: number;
	latitude: number;
	addressName: string;
	addressFullName: string;
};

type AccessesToken = {
	access_token: string;
};

export const cdekRouter = createTRPCRouter({
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

			const req_token = await axios.post<AccessesToken>(api_req_token);

			const token = req_token.data.access_token;

			const response = await axios.get<PointFromApi[]>(api_url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const points: FiltredPoint[] = response.data.map(
				(value: {
					name: string;
					work_time: string;
					phones?: [{ number: string }];
					email: string;
					type: string;
					location: {
						region: string;
						city: string;
						longitude: number;
						latitude: number;
						address: string;
						address_full: string;
					};
				}) => ({
					name: value.name,
					email: value.email,
					phone: value?.phones?.[0]?.number,
					type: value.type,
					work_time: value.work_time,
					region: value.location.region,
					city: value.location.city,
					longitude: value.location.longitude,
					latitude: value.location.latitude,
					addressName: value.location.address,
					addressFullName: value.location.address_full,
				})
			);
			return points.filter(({ type }) => type === 'PVZ');
		}),
});
