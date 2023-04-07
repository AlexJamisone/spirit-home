import { Center, Spinner } from '@chakra-ui/react';
import { UserProfile, useAuth } from '@clerk/nextjs';
import { buildClerkProps, clerkClient, getAuth } from '@clerk/nextjs/server';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserOrders from '~/components/User/UserOrders';
import { api } from '~/utils/api';
const ProfilePage = () => {
	const router = useRouter();
	const {path} = router.query
	const { isSignedIn } = useAuth();
	const { data: user, isLoading } = api.users.getUser.useQuery();
	useEffect(() => {
		if (!isSignedIn) {
			void router.push('/signin');
		} else if(user?.role !== "USER") {
			void router.push('/')
		}
	}, [isSignedIn]);
	if (isLoading)
		return (
			<Center>
				<Spinner />
			</Center>
		);
	if (!user) return null;
	console.log(path)
	const handlProfile = () => {
		switch(path) {
			case 'main':
				return <Center>Main page for user</Center>
			case 'orders':
				return <UserOrders/>
			case 'settings':
				return <UserProfile/>
		}
	}
	return (
		<Center>
			{handlProfile()}
		</Center>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { userId } = getAuth(ctx.req);

	const user = userId ? await clerkClient.users.getUser(userId) : undefined;

	return { props: { ...buildClerkProps(ctx.req, { user }) } };
};

export default ProfilePage;
