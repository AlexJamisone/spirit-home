import { Avatar, Input, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useUserMainContext } from '~/context/userMainContext';

const UserInfo = () => {
	const { handlAvatar, user } = useUserMainContext();
	return (
		<Stack
			direction="row"
			justifyContent="center"
			bgColor="whiteAlpha.100"
			boxShadow="xl"
			rounded="3xl"
			p={3}
			as={motion.div}
			layout
			initial={{ opacity: 0, y: 50 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: { type: 'spring', duration: 1 },
			}}
		>
			<Input
				type="file"
				accept=".jpg, .png, .gif, .jpeg"
				display="none"
				id="upload"
				onChange={(e) => {
					void handlAvatar(e);
				}}
			/>
			<Avatar
				cursor="pointer"
				as="label"
				htmlFor="upload"
				size={['lg', '2xl']}
				src={user.profileImageUrl}
			/>
			<Stack fontSize={[14, 16]} fontWeight={600}>
				<Text cursor="default">{user.email}</Text>
				<Stack direction="row">
					<Text>{user.firstName}</Text>
					<Text>{user.lastName}</Text>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default UserInfo;
