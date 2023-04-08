import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { Role } from '@prisma/client';

type ProtectionRoutesProps = {
	children: React.ReactNode;
	type: Role | undefined
};

const ProtectionRoutes = ({ children, type }: ProtectionRoutesProps) => {
	const { isSignedIn } = useUser();
	const router = useRouter();
	const { data: user } = api.users.get.useQuery();
	if (!user) return null;
	if(!isSignedIn) void router.push('/signin')
    if(user.role !== type) void router.push("/")
	return (
        <>
            {children}
        </>
    )
};

export default ProtectionRoutes;
