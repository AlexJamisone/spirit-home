import {
	Stat,
	StatArrow,
	StatHelpText,
	StatLabel,
	StatNumber,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import AnimatedCounter from '~/components/AnimatedCounter';
dayjs.locale('ru');

type StatCardProps = {
	revenu?: number;
	label?: string;
	diffrence?: number;
	isDate?: boolean;
	type: 'month' | 'day';
};

const StatCard = ({
	diffrence,
	revenu,
	label,
	isDate,
	type,
}: StatCardProps) => {
	return (
		<Stat boxShadow="2xl" p={3} rounded="2xl" minH={105}>
			{isDate ? (
				<StatLabel>
					{label} на {dayjs().format('D MMM')}
				</StatLabel>
			) : (
				<StatLabel>{label}</StatLabel>
			)}
			<StatNumber>
				<AnimatedCounter from={0} to={revenu ?? 0} /> ₽
			</StatNumber>
			<StatHelpText fontSize={[9, 10]}>
				<StatArrow
					type={diffrence ?? 0 <= 0 ? 'decrease' : 'increase'}
				/>
				<AnimatedCounter from={0} to={diffrence ?? 0} /> % чем за
				прошлый {type === 'month' ? 'месяц' : 'день'}
			</StatHelpText>
		</Stat>
	);
};

export default StatCard;
