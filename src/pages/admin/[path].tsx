import { Center } from '@chakra-ui/react';
import { UserProfile } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';

const Admin = () => {
	const router = useRouter();
    const {data: user} = api.users.getUser.useQuery()
    if(user?.role !== "ADMIN") return null
	const { path } = router.query;
	const handlAdmin = () => {
		switch (path) {
			case 'statictic':
				return <UserProfile />;
		}
	};
	return <Center>{handlAdmin()}</Center>;
};

export default Admin;
