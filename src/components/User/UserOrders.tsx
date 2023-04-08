import { Center } from '@chakra-ui/react';
import { useUser } from '@clerk/nextjs';

const UserOrders = () => {
	const { user } = useUser();
	return <Center>Here User Orders Comonent</Center>;
};

export default UserOrders;
