import { AnimatePresence } from 'framer-motion';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import NoData from '~/components/NoData/NoData';
import { api } from '~/utils/api';
import AdminOrdersCard from './AdminOrdersCard';

const AdminOrders = () => {
	const { data: orders } = api.orders.get.useQuery();
	if (!orders) return null;
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
