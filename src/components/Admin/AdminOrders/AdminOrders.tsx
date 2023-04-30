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
	return (
		<>
			{orders.length === 0 ? (
				<NoData
					icon={HiOutlineClipboardDocumentList}
					text="Пока что нет заказов"
				/>
			) : (
				orders.map((order) => (
					<AdminOrdersCard
						key={order.id}
						order={order}
						info={<AdminOrdersInfo />}
						statusComp={<AdminChangeStatus />}
						table={<AdminOrdersTable />}
						sum={<AdminOrderSum />}
					/>
				))
			)}
		</>
	);
};

export default AdminOrders;
