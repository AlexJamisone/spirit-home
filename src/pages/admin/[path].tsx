import { useRouter } from 'next/router';
import AdminCategorys from '~/UI/Admin/AdmiCategorys';
import AdminStatistics from '~/UI/Admin/AdminCharts/AdminStatistics';
import AdminDiscount from '~/UI/Admin/AdminDiscount';
import AdminOrders from '~/UI/Admin/AdminOrders';
import AdminProducts from '~/UI/Admin/AdminProducts';
import Layout from '~/components/Layout';
import ProtectionRoutes from '~/guards/ProtectionRoutes';

const Admin = () => {
	const router = useRouter();
	const { path } = router.query;
	const handlAdmin = () => {
		switch (path) {
			case 'statictic':
				return <AdminStatistics />;
			case 'categorys':
				return <AdminCategorys />;
			case 'product':
				return <AdminProducts />;
			case 'orders':
				return <AdminOrders />;
            case 'discount':
                return <AdminDiscount/>
		}
	};
	return (
		<Layout>
			<ProtectionRoutes type="ADMIN">{handlAdmin()}</ProtectionRoutes>
		</Layout>
	);
};

export default Admin;
