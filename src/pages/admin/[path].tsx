import { Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import AdminCategorys from '~/components/Admin/AdminCategorys';
import AdminStatistics from '~/components/Admin/AdminOrders/AdminCharts/AdminStatistics';
import AdminOrders from '~/components/Admin/AdminOrders/AdminOrders';
import AdminProducts from '~/components/Admin/AdminProducts';
import ProtectionRoutes from '~/guards/ProtectionRoutes';

const Admin = () => {
	const router = useRouter();
	const { path } = router.query;
	const handlAdmin = () => {
		switch (path) {
			case 'statictic':
				return (
					<AdminStatistics
						charts={<AdminStatistics.Charts />}
						stat={<AdminStatistics.Stat />}
						pick={<AdminStatistics.Pick />}
						visitors={<AdminStatistics.Visitors />}
					/>
				);
			case 'categorys':
				return <AdminCategorys />;
			case 'product':
				return <AdminProducts />;
			case 'orders':
				return <AdminOrders />;
		}
	};
	return (
		<Center flexWrap={'wrap'} pt={160} rowGap={5}>
			<ProtectionRoutes type="ADMIN">{handlAdmin()}</ProtectionRoutes>
		</Center>
	);
};

export default Admin;
