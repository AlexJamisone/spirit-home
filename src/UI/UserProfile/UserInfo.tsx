import { Stack, Text } from '@chakra-ui/react';
import { api } from '~/utils/api';
import UserAvatar from './UserAvatar';

const UserInfo = () => {
	const { data: user } = api.users.get.useQuery();
	if (!user) return null;
	return (
		<Stack
			boxShadow="2xl"
			maxW={400}
			p={5}
			rounded="2xl"
			alignItems="center"
			justifyContent="center"
			direction="row"
			gap={5}
			cursor="default"
		>
			<UserAvatar />
			<Stack alignItems="center">
				<Text>{user.email}</Text>
				{user.firstName && user.lastName && (
					<Text fontWeight={600}>
						{user.firstName} {user.lastName}
					</Text>
				)}
			</Stack>
		</Stack>
	);
};

export default UserInfo;
