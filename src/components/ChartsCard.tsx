import { Heading, Stack, useToken } from '@chakra-ui/react';
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

type ChartsCardProps = {
	label: string;
	data?: {
		date: string;
		Заказы?: number | undefined;
		Отмены?: number | undefined;
		Выручка?: number | undefined;
	}[];
	isOrders?: boolean;
};
const ChartsCard = ({ data, label, isOrders }: ChartsCardProps) => {
	const [tel400, green400, red300] = useToken('colors', [
		'telegram.400',
		'green.400',
		'red.300',
	]);
	return (
		<Stack p={5} boxShadow="2xl" w="fit-content" rounded="2xl">
			<Heading textColor="second" fontFamily="heading" fontSize="2xl">
				{label}
			</Heading>
			<LineChart
				width={600}
				height={200}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<XAxis dataKey="date" fontSize={12} padding={{ left: 0 }} />
				<YAxis allowDecimals={false} fontSize={12} />
				<Tooltip
					contentStyle={{
						borderRadius: '15px',
						fontSize: '12px',
					}}
				/>
				{isOrders ? (
					<>
						<Line
							type="monotone"
							dataKey="Заказы"
							strokeWidth={2}
							stroke={tel400}
						/>
						<Line
							type="monotone"
							dataKey="Отмены"
							strokeWidth={2}
							stroke={red300}
						/>
					</>
				) : (
					<>
						<Line
							type="monotone"
							dataKey="Выручка"
							strokeWidth={2}
							stroke={green400}
						/>
					</>
				)}
			</LineChart>
		</Stack>
	);
};

export default ChartsCard;
