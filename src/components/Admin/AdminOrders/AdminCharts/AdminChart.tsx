import { Spinner, Stack, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { api } from '~/utils/api';

const AdminChart = () => {
	const { data: orders, isLoading } = api.orders.getForCharts.useQuery();
	if (!orders || isLoading) return <Spinner />;
	return (
		<Stack w="80%" justifyContent="center">
			<ResponsiveContainer width={'80%'} height={300}>
				<LineChart data={orders.data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" fontSize={12} padding={{ left: 0 }} />
					<YAxis allowDecimals={false} />
					<Tooltip />
					<Legend />
					<Line
						type="monotone"
						dataKey="Отменёные заказы"
						strokeWidth={2}
						stroke="red"
					/>
					<Line
						type="monotone"
						dataKey="Количество заказов"
						strokeWidth={3}
					/>
				</LineChart>
			</ResponsiveContainer>
			<Stat>
				<StatLabel>Jamison.Comp</StatLabel>
				<StatNumber>{orders.jamison} ₽</StatNumber>
			</Stat>
			<Stat>
				<StatLabel>Выручка за сегодня</StatLabel>
				<StatNumber>{orders.today} ₽</StatNumber>
			</Stat>
		</Stack>
	);
};

export default AdminChart;
