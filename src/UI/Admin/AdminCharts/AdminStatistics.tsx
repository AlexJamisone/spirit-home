import { Stack } from '@chakra-ui/react';
import AdminCharts from './AdminCharts';
import AdminDatePick from './AdminDatePick';
import AdminStat from './AdminStat';
import AdminVisitors from './AdminVisitors';

const AdminStatistics = () => {
	return (
		<Stack direction="row">
			<Stack gap={5}>
				<AdminVisitors />
				<AdminStat />
			</Stack>
			<Stack gap={5}>
				<AdminDatePick />
				<AdminCharts />
			</Stack>
		</Stack>
	);
};

export default AdminStatistics;
