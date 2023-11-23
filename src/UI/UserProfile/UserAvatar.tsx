import { Avatar, Input, Stack, useToast } from '@chakra-ui/react';
import { useClerk } from '@clerk/nextjs';
import type { ChangeEvent } from 'react';
import { api } from '~/utils/api';

const UserAvatar = () => {
	const { data: user } = api.users.get.useQuery();
	const { user: userClerk } = useClerk();
	const toast = useToast();
	if (!user) return null;
	const handlAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files[0]) {
			try {
				await userClerk?.setProfileImage({ file: files[0] });
				await userClerk?.reload();
			} catch (error) {
				toast({
					description: `Ошибка: ${error as string}`,
					status: 'error',
					isClosable: true,
				});
			}
		}
	};
	return (
		<Stack>
			<Input
				display="none"
				type="file"
				accept=".jpg, .png, .gif, .jpeg"
				id="upload"
				onChange={(e) => void handlAvatar(e)}
			/>
			<Avatar
				cursor="pointer"
				as="label"
				htmlFor="upload"
				src={user.profileImageUrl}
			/>
		</Stack>
	);
};

export default UserAvatar;
