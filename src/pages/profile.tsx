import { useAuth, SignedIn, useUser, UserProfile } from '@clerk/nextjs';
import { api } from '~/utils/api';
import { Center, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import AdminProfile from '~/components/AdminProfile';
import { useEffect } from 'react';
const ProfilePage = () => {
	const router = useRouter();
	const { isSignedIn } = useAuth();
	const { user } = useUser();
	useEffect(() => {
        console.log('hit useEffect')
        if(!isSignedIn) {
            void router.push("/signin")
        }
    }, [isSignedIn])
	const { data, isLoading } = api.users.getUser.useQuery({
		email: user?.emailAddresses[0]?.emailAddress as string,
	});
	if (isLoading)
		return (
			<Center>
				<Spinner />
			</Center>
		);
	if (!data) return null;

	return (
		<SignedIn>
			<Center>
				{data.role === 'USER' ? <UserProfile /> : <AdminProfile />}
			</Center>
		</SignedIn>
	);
};

export default ProfilePage;
