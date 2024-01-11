import { Spinner, Stack } from '@chakra-ui/react';
import { BsBox } from 'react-icons/bs';
import NoData from '~/components/NoData/NoData';
import { api } from '~/utils/api';
import OrderCard from './OrderCard';
const AdminOrders = () => {
	const { data: orders, isLoading } = api.orders.get.useQuery();

	if (!orders) return null;
	if (orders.length === 0)
		return <NoData icon={BsBox} text="Пока что нет заказов!" />;
	if (isLoading) return <Spinner />;

	return (
		<Stack>
			{orders?.map((order) => (
				<OrderCard order={order} key={order.id} />
			))}
		</Stack>
	);
};

export default AdminOrders;
