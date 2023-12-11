import { Stack, StatGroup } from '@chakra-ui/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { motion } from 'framer-motion';
import Loading from '~/components/Loading';
import StatCard from '~/components/StatCard';
import { api } from '~/utils/api';

dayjs.locale('ru');

const AdminStat = () => {
	const { data: orders, isLoading } = api.charts.static.useQuery();
	return (
		<Stack
			as={motion.div}
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			direction="row"
			justifyContent="center"
		>
			<StatGroup as={Stack} direction="row">
				<Loading isLoaded={!!orders || !isLoading}>
					<StatCard
						diffrence={orders?.diffrence.jamison}
						label="Jamison"
						revenu={orders?.jamison}
						type="month"
					/>
				</Loading>
				<Loading isLoaded={!!orders || !isLoading}>
					<StatCard
						diffrence={orders?.diffrence.oli}
						revenu={orders?.oli}
						label="Oli"
						type="month"
					/>
				</Loading>
				<Loading isLoaded={!!orders || !isLoading}>
					<StatCard
						diffrence={orders?.diffrence.rev}
						isDate
						label="Выручка"
						revenu={orders?.todayRevenu}
						type="day"
					/>
				</Loading>
			</StatGroup>
		</Stack>
	);
};

export default AdminStat;
