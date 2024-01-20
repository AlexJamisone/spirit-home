import { Stack } from '@chakra-ui/react';
import ChartsCard from '~/components/ChartsCard';
import Loading from '~/components/Loading';
import { useDateRange } from '~/stores/useDateRange';
import { api } from '~/utils/api';

const AdminCharts = () => {
	const send = useDateRange((state) => state.send);
	const { data: orders, isLoading } = api.charts.range.useQuery({
		selectedDate: send!,
	});
	return (
		<Stack gap={10}>
			<Loading isLoaded={!!orders || !isLoading}>
				<ChartsCard data={orders?.data} label="Заказы" isOrders />
			</Loading>
			<Loading isLoaded={!!orders || !isLoading}>
				<ChartsCard data={orders?.data} label="Выручка" />
			</Loading>
		</Stack>
	);
};

export default AdminCharts;
