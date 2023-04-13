import {
	Avatar,
	Stack,
	Grid,
	GridItem,
	Text,
	Button,
	useDisclosure,
	IconButton,
	Icon,
	useToast,
} from '@chakra-ui/react';
import { api } from '~/utils/api';
import UserAddressesFormModal from './UserAddressesFormModal';
import { BsTrashFill } from 'react-icons/bs';

const UserMain = () => {
	const { data: user } = api.users.get.useQuery();

	const { mutate: deleteAddress, isLoading } =
		api.addresses.delete.useMutation();
	const ctx = api.useContext();
	const { isOpen, onClose, onToggle } = useDisclosure();
	const toast = useToast();
	if (!user) return null;
	const handlDeletAddress = (id: string) => {
		deleteAddress(
			{ id },
			{
				onSuccess: () => {
					toast({
						description: `Адрес успешно удалённ!🌊`,
						status: 'info',
						isClosable: true,
					});
					void ctx.users.invalidate();
				},
			}
		);
	};
	return (
		<Grid
			w={['70%']}
			templateColumns="repeat(2, 1fr)"
			gap={5}
			justifyContent="space-between"
		>
			<GridItem>
				<Stack direction="row">
					<Avatar size="2xl" src={user.profileImageUrl} />
					<Text>{user.email}</Text>
				</Stack>
				<Stack w={['600px']}>
					<Text textAlign="center">Адреса доставки</Text>
					<Stack
						direction="row"
						gap={5}
						alignItems="center"
						flexWrap="wrap"
					>
						<Button
							w={['40%']}
							h={['200px']}
							variant="outline"
							onClick={onToggle}
						>
							Добавить Адрес
						</Button>
						<UserAddressesFormModal
							isOpen={isOpen}
							onClose={onClose}
						/>
						{user.address?.length === 0 ? (
							<Text>Пока что нету адрессов</Text>
						) : (
							user.address?.map(
								({ id, city, contactPhone, point }) => (
									<Stack
										key={id}
										direction="column"
										gap={3}
										border="1px solid #CBD5E0"
										rounded="2xl"
										p={5}
										maxW={['100%']}
										position="relative"
									>
										<Text>Имя: {user.firstName}</Text>
										<Text>Фамилия: {user.lastName}</Text>
										<Text>Email: {user.email}</Text>
										<Text>Телефон: {contactPhone}</Text>
										<Text>Город: {city}</Text>
										<Text>СДЭК ПВЗ: {point}</Text>
										<IconButton
											isLoading={isLoading}
											size="sm"
											position="absolute"
											top={2}
											right={5}
											aria-label="delet"
											onClick={() =>
												handlDeletAddress(id)
											}
											icon={
												<Icon
													as={BsTrashFill}
													color="red.400"
												/>
											}
										/>
									</Stack>
								)
							)
						)}
					</Stack>
				</Stack>
			</GridItem>
			<GridItem>
				<Stack>
					<Text>orders</Text>
				</Stack>
			</GridItem>
		</Grid>
	);
};

export default UserMain;
