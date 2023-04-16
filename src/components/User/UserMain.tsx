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
import { useReducer, useState } from 'react';
import {
	InputAddressReducer,
	initialState,
} from '~/reducer/InputAddressReducer';
import type { Address } from '@prisma/client';
import UserAddressCard from './UserAddressCard';
import UserOrders from './UserOrders';

const UserMain = () => {
	const { data: user } = api.users.get.useQuery();
	const [edit, setEdit] = useState(false);
	const { mutate: deleteAddress, isLoading } =
		api.addresses.delete.useMutation();
	const ctx = api.useContext();
	const { isOpen, onClose, onToggle } = useDisclosure();
	const toast = useToast();

	const [input, dispatch] = useReducer(InputAddressReducer, initialState);
	if (!user) return null;
	const handlAdd = () => {
		if (user.firstName && user.lastName) {
			dispatch({ type: 'SET_NAME', payload: user.firstName });
			dispatch({ type: 'SET_LAST_NAME', payload: user.lastName });
			onToggle();
		} else {
			onToggle();
		}
	};
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
	const handlEdit = (address: Address) => {
		dispatch({
			type: 'SET_ALL',
			payload: {
				id: address.id,
				citys: address.city,
				firstName: user.firstName,
				contactPhone: address.contactPhone,
				lastName: user.lastName,
				point: address.point,
			},
		});
		setEdit(true);
		onToggle();
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
					<Stack>
						<Text>{user.email}</Text>
						<Stack direction="row">
							<Text>{user.firstName}</Text>
							<Text>{user.lastName}</Text>
						</Stack>
					</Stack>
				</Stack>
				<Stack
					w={['700px']}
					justifyContent="center"
					alignItems="center"
				>
					<Text textAlign="center">Адреса доставки</Text>
					<Stack
						direction="row"
						gap={5}
						alignItems="center"
						flexWrap="wrap"
						justifyContent="center"
					>
						<Button
							variant="outline"
							onClick={() => handlAdd()}
							w="100%"
						>
							Добавить Адрес
						</Button>
						<UserAddressesFormModal
							isOpen={isOpen}
							onClose={onClose}
							dispatch={dispatch}
							input={input}
							edit={edit}
							setEdit={setEdit}
						/>
						{user.address?.length === 0 ? (
							<Text>Пока что нету адрессов</Text>
						) : (
							user.address?.map((address) => {
								return (
									<UserAddressCard
										key={address.id}
										address={address}
										email={user.email}
										firstName={user.firstName}
										lastName={user.lastName}
										handlDeletAddress={handlDeletAddress}
										handlEdit={handlEdit}
										isLoading={isLoading}
									/>
								);
							})
						)}
					</Stack>
				</Stack>
			</GridItem>
			<GridItem>
				<UserOrders />
			</GridItem>
		</Grid>
	);
};

export default UserMain;
