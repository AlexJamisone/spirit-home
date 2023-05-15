import {
	Stack,
	Stat,
	StatArrow,
	StatHelpText,
	StatLabel,
	StatNumber,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useChartsContext } from '~/context/chartsContext';
import AnimatedCounter from './AnimatedCounter';

const AdminStat = () => {
	const { orders } = useChartsContext();
	if (!orders) return null;
	return (
		<Stack
			as={motion.div}
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			direction="row"
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
					<AnimatedCounter from={0} to={orders.todayDifrByJamison} />{' '}
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
							orders.todayDifrByDay >= 0 ? 'increase' : 'decrease'
						}
					/>
					<AnimatedCounter from={0} to={orders.todayDifrByDay} /> %
					чем за прошлый день
				</StatHelpText>
			</Stat>
			<Stat>
				<StatLabel fontSize={19}>Выручка за месяц</StatLabel>
				<StatNumber>
					<AnimatedCounter from={0} to={orders.monthRevenue} /> ₽
				</StatNumber>
			</Stat>
		</Stack>
	);
};

export default AdminStat;
