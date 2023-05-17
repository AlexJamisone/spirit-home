/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import NoData from '~/components/NoData/NoData';
import { api } from '~/utils/api';
import AdminChangeStatus from './AdminChangeStatus';
import AdminOrderSum from './AdminOrderSum';
import AdminOrdersCard from './AdminOrdersCard';
import AdminOrdersInfo from './AdminOrdersInfo';
import AdminOrdersTable from './AdminOrdersTable';

const AdminOrders = () => {
	const { data: orders } = api.orders.get.useQuery();

	if (!orders) return null;
	const showNotification = async () => {
		const promission = await Notification.requestPermission();
		if (promission === 'granted') {
			new Notification('Новый заказ', {
				body: 'Новый заказ от пользователя',
			});
		}
	};
	return (
		<>
			<Button onClick={showNotification}></Button>
			{orders.length === 0 ? (
				<NoData
					icon={HiOutlineClipboardDocumentList}
					text="Пока что нет заказов"
				/>
			) : (
				<AnimatePresence>
					{orders.map((order) => (
						<AdminOrdersCard
							key={order.id}
							order={order}
							info={<AdminOrdersInfo />}
							statusComp={<AdminChangeStatus />}
							table={<AdminOrdersTable />}
							sum={<AdminOrderSum />}
						/>
					))}{' '}
				</AnimatePresence>
			)}
		</>
	);
};

export default AdminOrders;
