import { Stack } from '@chakra-ui/react';
import UserAddress from './UserAddress';
import UserInfo from './UserInfo';

const UserProfile = () => {
	return (
		<Stack gap={10} alignItems="center">
			<UserInfo />
			<UserAddress />
		</Stack>
	);
};

export default UserProfile;
