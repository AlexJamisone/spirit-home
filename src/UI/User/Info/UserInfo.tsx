import {
	Avatar,
	Editable,
	EditableInput,
	EditablePreview,
	Input,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react';
import { useClerk } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { useUserMainContext } from '~/context/userMainContext';
import { api } from '~/utils/api';
import UserInfoEditableContols from './UserInfoEditableContols';

const UserInfo = () => {
	const { handlAvatar, user } = useUserMainContext();
	const { user: clerkUser } = useClerk();
	const { mutate: changeName, isLoading: loadingName } =
		api.users.changeFirstName.useMutation();
	const { mutate: changeLast, isLoading: loadingLast } =
		api.users.changeLastName.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const handlEdit = async (value: string, variant: 'name' | 'lastName') => {
		if (variant === 'name') {
			await clerkUser
				?.update({
					firstName: value,
				})
				.catch((e) => {
					toast({
						description: `Ошибка: ${e as string}`,
						isClosable: true,
						status: 'error',
					});
				});
			changeName(
				{
					name: value,
				},
				{
					onSuccess: () => {
						void ctx.users.invalidate();
						toast({
							description: 'Имя успешно обновленно',
							status: 'loading',
							isClosable: true,
						});
					},
				}
			);
		} else {
			await clerkUser
				?.update({
					lastName: value,
				})
				.catch((e) => {
					toast({
						description: `Ошибка: ${e as string}`,
						isClosable: true,
						status: 'error',
					});
				});
			changeLast(
				{
					lastName: value,
				},
				{
					onSuccess: () => {
						void ctx.users.invalidate();
						toast({
							description: 'Фамилия успешно обновленна',
							status: 'loading',
							isClosable: true,
						});
					},
				}
			);
		}
	};
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
				<Stack direction="column" m={0}>
					<Editable
						defaultValue={
							user.firstName ?? 'Нажми что бы изменить имя'
						}
						submitOnBlur={false}
						onSubmit={(val) => void handlEdit(val, 'name')}
					>
						<EditablePreview cursor="pointer" />
						<Stack direction="row">
							<EditableInput />
							<UserInfoEditableContols isLoading={loadingName} />
						</Stack>
					</Editable>
					<Editable
						defaultValue={
							user.lastName ?? 'Нажми что бы изменить фамилию'
						}
						submitOnBlur={false}
						onSubmit={(val) => void handlEdit(val, 'lastName')}
					>
						<EditablePreview cursor="pointer" />
						<Stack direction="row">
							<EditableInput />
							<UserInfoEditableContols isLoading={loadingLast} />
						</Stack>
					</Editable>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default UserInfo;
