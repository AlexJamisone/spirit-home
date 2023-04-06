import { useAuth, SignedIn } from '@clerk/nextjs';
import { api } from '~/utils/api';
import { Center, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import AdminProfile from '~/components/AdminProfile';
import { useEffect } from 'react';
import UserProfilePage from '~/components/UserProfile';
import { buildClerkProps, clerkClient, getAuth } from '@clerk/nextjs/server';
import type  { GetServerSideProps } from 'next';
const ProfilePage = () => {
	const router = useRouter();
	const { isSignedIn } = useAuth();
	useEffect(() => {
		console.log('hit useEffect');
		if (!isSignedIn) {
			void router.push('/signin');
		}
	}, [isSignedIn]);
	const { data, isLoading } = api.users.getUser.useQuery();
	if (isLoading)
		return (
			<Center>
				<Spinner />
			</Center>
		);
	if (!data) return null;
	return (
		<SignedIn>
			{data.role === 'USER' ? <UserProfilePage /> : <AdminProfile />}
		</SignedIn>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { userId } = getAuth(ctx.req);

	const user = userId ? await clerkClient.users.getUser(userId) : undefined;

	return { props: { ...buildClerkProps(ctx.req, { user }) } };
};

export default ProfilePage;
