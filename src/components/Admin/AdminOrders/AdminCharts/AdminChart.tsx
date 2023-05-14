import {
	Icon,
	IconButton,
	Spinner,
	Stack,
	Stat,
	StatArrow,
	StatHelpText,
	StatLabel,
	StatNumber,
} from '@chakra-ui/react';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MdDone } from 'react-icons/md';
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
dayjs().locale('ru').format();

const AdminChart = () => {
	const [selectedDate, setSelectedDate] = useState<Date[]>([
		dayjs().startOf('month').toDate(),
		dayjs().endOf('month').toDate(),
	]);
	const [isDate, setIsDate] = useState(false);
	const [send, setSend] = useState<Date[]>([]);
	const { data: orders, isLoading } = api.charts.get.useQuery({
		selectedDate: send,
	});
	if (!orders || isLoading) return <Spinner size="lg" />;
	return (
		<Stack w="80%" justifyContent="center">
			<Stack direction="row">
				<RangeDatepicker
					selectedDates={selectedDate}
					onDateChange={(date) => {
						if (selectedDate.length === 2) {
							setIsDate(false);
						} else {
							setIsDate(true);
						}
						setSelectedDate(date);
					}}
					configs={{
						dateFormat: 'dd/MM/yyyy',
					}}
					propsConfigs={{
						inputProps: {
							cursor: 'pointer',
							w: '300px',
						},
					}}
				/>
				{isDate ? (
					<IconButton
						aria-label="save-date-pick"
						colorScheme="teal"
						icon={<Icon as={MdDone} boxSize={5} />}
						onClick={() => setSend(selectedDate)}
					/>
				) : null}
			</Stack>

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
			<Stack
				as={motion.div}
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<Stat>
					<StatLabel fontSize={19}>Jamison.Comp</StatLabel>
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
						<AnimatedCounter
							from={0}
							to={orders.todayDifrByJamison}
						/>{' '}
						% чем за прошлый месяц
					</StatHelpText>
				</Stat>
				<Stat>
					<StatLabel fontSize={19}>Выручка за сегодня</StatLabel>
					<StatNumber>
						<AnimatedCounter from={0} to={orders.today} /> ₽
					</StatNumber>
					<StatHelpText>
						<StatArrow
							type={
								orders.todayDifrByDay >= 0
									? 'increase'
									: 'decrease'
							}
						/>
						<AnimatedCounter from={0} to={orders.todayDifrByDay} />{' '}
						% чем за прошлый день
					</StatHelpText>
				</Stat>
				<Stat>
					<StatLabel fontSize={19}>Выручка за месяц</StatLabel>
					<StatNumber>
						<AnimatedCounter from={0} to={orders.monthRevenue} /> ₽
					</StatNumber>
					{/* <StatHelpText>
					<StatArrow
						type={
							orders.todayDifrByDay >= 0 ? 'increase' : 'decrease'
						}
					/>
					<AnimatedCounter from={0} to={orders.todayDifrByDay} /> %
					чем за прошлый день
				</StatHelpText> */}
				</Stat>
			</Stack>
		</Stack>
	);
};

export default AdminChart;
