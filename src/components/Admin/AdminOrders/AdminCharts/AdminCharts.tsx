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
import { useChartsContext } from '~/context/chartsContext';

const AdminCharts = () => {
	const { orders } = useChartsContext();
	if (!orders) return null;
	return (
		<>
			<ResponsiveContainer width={'80%'} height={300}>
				<LineChart data={orders.data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" fontSize={12} padding={{ left: 0 }} />
					<YAxis allowDecimals={false} />
					<Tooltip />
					<Legend />

					<Line
						type="monotone"
						dataKey="Отмененые заказы"
						strokeWidth={2}
						stroke="red"
					/>
					<Line type="monotone" dataKey="Заказы" strokeWidth={3} />
				</LineChart>
			</ResponsiveContainer>
			<ResponsiveContainer width={'80%'} height={300}>
				<LineChart data={orders.data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" fontSize={12} padding={{ left: 0 }} />
					<YAxis allowDecimals={false} />
					<Tooltip />
					<Legend />

					<Line type="monotone" dataKey="Выручка" strokeWidth={3} />
				</LineChart>
			</ResponsiveContainer>
		</>
	);
};

export default AdminCharts;
