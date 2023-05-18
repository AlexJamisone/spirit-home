import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import NoData from '~/components/NoData/NoData';
import { api } from '~/utils/api';
import AdminOrdersCard from './AdminOrdersCard';

const AdminOrders = () => {
	const { data: orders } = api.orders.get.useQuery();
	const [ordersLength, setOrdersLength] = useState(orders?.length);

	useEffect(() => {
		setOrdersLength(orders?.length);
	}, [orders?.length]);
	if (!orders) return null;
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	if (orders.length > ordersLength!) {
		new Notification('Новый заказ', {
			body: 'Some sort of orders',
		});
	}
	return (
		<>
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
							info={<AdminOrdersCard.Info />}
							statusComp={<AdminOrdersCard.Status />}
							table={<AdminOrdersCard.Table />}
							sum={<AdminOrdersCard.Sum />}
						/>
					))}{' '}
				</AnimatePresence>
			)}
		</>
	);
};

export default AdminOrders;
