import { Center, Spinner } from '@chakra-ui/react';
import { UserProfile } from '@clerk/nextjs';
import { buildClerkProps, clerkClient, getAuth } from '@clerk/nextjs/server';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import UserMain from '~/components/User/UserMain';
import UserOrders from '~/components/User/UserOrders';
import ProtectionRoutes from '~/guards/ProtectionRoutes';
import { api } from '~/utils/api';
const ProfilePage = () => {
	const router = useRouter();
	const { path } = router.query;
	const { data: user, isLoading } = api.users.get.useQuery();

	if (isLoading)
		return (
			<Center>
				<Spinner />
			</Center>
		);
	if (!user) return null;
	const handlProfile = () => {
		switch (path) {
			case 'main':
				return <UserMain />;
			case 'orders':
				return <UserOrders />;
			case 'settings':
				return <UserProfile />;
		}
	};
	return (
		<Center as='main' mx={['20px']}>
			<ProtectionRoutes type="USER">{handlProfile()}</ProtectionRoutes>
		</Center>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { userId } = getAuth(ctx.req);

	const user = userId ? await clerkClient.users.getUser(userId) : undefined;

	return { props: { ...buildClerkProps(ctx.req, { user }) } };
};

export default ProfilePage;
