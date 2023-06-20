import { Spinner, Stack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useState, type ReactNode } from 'react';
import ChartsContext from '~/context/chartsContext';
import { api } from '~/utils/api';
import AdminCharts from './AdminCharts';
import AdminDatePick from './AdminDatePick';
import AdminNotificationButton from './AdminNotificationButton';
import AdminStat from './AdminStat';
import AdminVisitors from './AdminVisitors';
dayjs().locale('ru').format();

type AdminStatisticsProps = {
	stat?: ReactNode;
	charts?: ReactNode;
	pick?: ReactNode;
	visitors?: ReactNode;
	notification?: ReactNode;
};

const AdminStatistics = ({
	stat,
	charts,
	pick,
	visitors,
	notification,
}: AdminStatisticsProps) => {
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
		<ChartsContext.Provider
			value={{
				orders,
				isDate,
				selectedDate,
				send,
				setSelectedDate,
				setSend,
				setIsDate,
			}}
		>
			<Stack justifyContent="center" w={'90%'}>
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
				>
					{pick}
					{notification}
				</Stack>
				{charts}
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
				>
					{stat}
					{visitors}
				</Stack>
			</Stack>
		</ChartsContext.Provider>
	);
};

AdminStatistics.Pick = AdminDatePick;
AdminStatistics.Charts = AdminCharts;
AdminStatistics.Stat = AdminStat;
AdminStatistics.Visitors = AdminVisitors;
AdminStatistics.NotificationButton = AdminNotificationButton;

export default AdminStatistics;
