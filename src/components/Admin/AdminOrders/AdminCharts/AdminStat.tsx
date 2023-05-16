import {
	Stack,
	Stat,
	StatArrow,
	StatGroup,
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
			justifyContent="center"
		>
			<StatGroup fontSize={[14, 19]} gap={[5, null]}>
				<Stat>
					<StatLabel>Jamison.Comp</StatLabel>
					<StatNumber>
						<AnimatedCounter from={0} to={orders.jamison} /> ₽
					</StatNumber>
					<StatHelpText fontSize={[12, 14]}>
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
					<StatLabel>Сегодня</StatLabel>
					<StatNumber>
						<AnimatedCounter from={0} to={orders.today} /> ₽
					</StatNumber>
					<StatHelpText fontSize={[12, 14]}>
						<StatArrow
							type={
								orders.todayDifrByDay >= 0
									? 'increase'
									: 'decrease'
							}
						/>
						<AnimatedCounter from={0} to={orders.todayDifrByDay} />{' '}
						% чем за вчера
					</StatHelpText>
				</Stat>
				<Stat>
					<StatLabel>Выручка за месяц</StatLabel>
					<StatNumber>
						<AnimatedCounter from={0} to={orders.monthRevenue} /> ₽
					</StatNumber>
				</Stat>
			</StatGroup>
		</Stack>
	);
};

export default AdminStat;