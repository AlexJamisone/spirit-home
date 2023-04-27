import { Center } from '@chakra-ui/react';
import { UserProfile } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import AdminCategorys from '~/components/Admin/AdminCategorys';
import AdminOrders from '~/components/Admin/AdminOrders/AdminOrders';
import AdminProducts from '~/components/Admin/AdminProducts';
import ProtectionRoutes from '~/guards/ProtectionRoutes';

const Admin = () => {
	const router = useRouter();
	const { path } = router.query;
	const handlAdmin = () => {
		switch (path) {
			case 'statictic':
				return <UserProfile />;
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
