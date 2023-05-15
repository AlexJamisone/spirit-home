import { Icon, IconButton, Spinner, Stack } from '@chakra-ui/react';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import dayjs from 'dayjs';
import { useState, type ReactNode } from 'react';
import { MdDone } from 'react-icons/md';
import ChartsContext from '~/context/chartsContext';
import { api } from '~/utils/api';
import AdminCharts from './AdminCharts';
import AdminStat from './AdminStat';
dayjs().locale('ru').format();

type AdminStatisticsProps = {
	stat?: ReactNode;
	charts?: ReactNode;
};

const AdminStatistics = ({ stat, charts }: AdminStatisticsProps) => {
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
			}}
		>
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

				{charts}
				{stat}
			</Stack>
		</ChartsContext.Provider>
	);
};

AdminStatistics.Charts = AdminCharts;
AdminStatistics.Stat = AdminStat;

export default AdminStatistics;
