import {
	Spinner,
	Stack,
	Stat,
	StatArrow,
	StatHelpText,
	StatLabel,
	StatNumber,
} from '@chakra-ui/react';
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
import AnimatedCounter from './AnimatedCounter';

const AdminChart = () => {
	const { data: orders, isLoading } = api.charts.get.useQuery();
	if (!orders || isLoading) return <Spinner size="lg" />;
	console.log();
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
				<StatNumber>
					<AnimatedCounter from={0} to={orders.jamison} /> ₽
				</StatNumber>
				<StatHelpText>
					<StatArrow
						type={
							orders.todayDifrByJamison >= 0
								? 'increase'
								: 'decrease'
						}
					/>
					<AnimatedCounter from={0} to={orders.todayDifrByJamison} />{' '}
					%
				</StatHelpText>
			</Stat>
			<Stat>
				<StatLabel>Выручка за сегодня</StatLabel>
				<StatNumber>
					<AnimatedCounter from={0} to={orders.today} /> ₽
				</StatNumber>
				<StatHelpText>
					<StatArrow
						type={
							orders.todayDifrByDay >= 0 ? 'increase' : 'decrease'
						}
					/>
					<AnimatedCounter from={0} to={orders.todayDifrByDay} /> %
				</StatHelpText>
			</Stat>
		</Stack>
	);
};

export default AdminChart;
