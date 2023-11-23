import { UserProfile as Settings } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import UserProfile from '~/UI/UserProfile';
import Layout from '~/components/Layout';
import ProtectionRoutes from '~/guards/ProtectionRoutes';
const ProfilePage = () => {
	const router = useRouter();
	const { path } = router.query;
	const handlProfile = () => {
		switch (path) {
			case 'main':
				return <UserProfile />;
			case 'orders':
			// return <UserOrders />;
			case 'settings':
				return <Settings />;
			case 'favorites':
			// return <UserFavorites />;
		}
	};
	return (
		<Layout>
			<ProtectionRoutes type="USER">{handlProfile()}</ProtectionRoutes>
		</Layout>
	);
};

export default ProfilePage;
