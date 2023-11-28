import { useRouter } from 'next/router';
import AdminCategorys from '~/UI/Admin/AdmiCategorys';
import AdminProducts from '~/UI/Admin/AdminProducts';
import Layout from '~/components/Layout';
import ProtectionRoutes from '~/guards/ProtectionRoutes';

const Admin = () => {
	const router = useRouter();
	const { path } = router.query;
	const handlAdmin = () => {
		switch (path) {
			case 'statictic':
				return (
					// <AdminStatistics
					// 	charts={<AdminStatistics.Charts />}
					// 	stat={<AdminStatistics.Stat />}
					// 	pick={<AdminStatistics.Pick />}
					// 	visitors={<AdminStatistics.Visitors />}
					// />
					<></>
				);
			case 'categorys':
				return <AdminCategorys />;
			case 'product':
				return <AdminProducts />;
			case 'orders':
			// return <AdminOrders />;
		}
	};
	return (
		<Layout>
			<ProtectionRoutes type="ADMIN">{handlAdmin()}</ProtectionRoutes>
		</Layout>
	);
};

export default Admin;
