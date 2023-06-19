import { Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import AdminCategorys from '~/UI/Admin/AdmiCategorys/AdminCategorys';
import AdminStatistics from '~/UI/Admin/AdminCharts/AdminStatistics';
import AdminOrders from '~/UI/Admin/AdminOrders/AdminOrders';
import AdminProducts from '~/UI/Admin/AdminProducts';
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
						notification={<AdminStatistics.NotificationButton />}
					/>
				);
			case 'categorys':
				return (
					<AdminCategorys
						catCards={<AdminCategorys.Cards />}
						subCategory={<AdminCategorys.SubCat />}
						mainCategory={<AdminCategorys.MainCat />}
					/>
				);
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
