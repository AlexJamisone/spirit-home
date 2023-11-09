// import { useMediaQuery } from '@chakra-ui/react';
// import {
// 	CartesianGrid,
// 	Legend,
// 	Line,
// 	LineChart,
// 	ResponsiveContainer,
// 	Tooltip,
// 	XAxis,
// 	YAxis,
// } from 'recharts';
// import { useChartsContext } from '~/context/chartsContext';

// const AdminCharts = () => {
// 	const { orders } = useChartsContext();
// 	const [isLowerThan930, isLowerThan1200] = useMediaQuery([
// 		'(max-width: 930px)',
// 		'(max-width: 1200px)',
// 	]);
// 	if (!orders) return null;
// 	return (
// 		<>
// 			<ResponsiveContainer height={isLowerThan930 ? 200 : 300}>
// 				<LineChart
// 					data={orders.data}
// 					margin={{
// 						left: isLowerThan930
// 							? undefined
// 							: isLowerThan1200
// 							? 100
// 							: undefined,
// 						right: isLowerThan930
// 							? undefined
// 							: isLowerThan1200
// 							? 100
// 							: undefined,
// 					}}
// 				>
// 					<CartesianGrid strokeDasharray="3 3" />
// 					<XAxis dataKey="date" fontSize={12} padding={{ left: 0 }} />
// 					<YAxis allowDecimals={false} />
// 					<Tooltip />
// 					<Legend />

// 					<Line
// 						type="monotone"
// 						dataKey="Отмененые заказы"
// 						strokeWidth={2}
// 						stroke="red"
// 					/>
// 					<Line type="monotone" dataKey="Заказы" strokeWidth={3} />
// 				</LineChart>
// 			</ResponsiveContainer>
// 			<ResponsiveContainer height={isLowerThan930 ? 200 : 300}>
// 				<LineChart
// 					data={orders.data}
// 					margin={{
// 						left: isLowerThan930
// 							? undefined
// 							: isLowerThan1200
// 							? 100
// 							: undefined,
// 						right: isLowerThan930
// 							? undefined
// 							: isLowerThan1200
// 							? 100
// 							: undefined,
// 					}}
// 				>
// 					<CartesianGrid strokeDasharray="3 3" />
// 					<XAxis dataKey="date" fontSize={12} padding={{ left: 0 }} />
// 					<YAxis allowDecimals={false} />
// 					<Tooltip />
// 					<Legend />

// 					<Line type="monotone" dataKey="Выручка" strokeWidth={3} />
// 				</LineChart>
// 			</ResponsiveContainer>
// 		</>
// 	);
// };

// export default AdminCharts;
