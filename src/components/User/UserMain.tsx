import {
	Avatar,
	Button,
	Grid,
	GridItem,
	Stack,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import type { Address } from '@prisma/client';
import { AnimatePresence } from 'framer-motion';
import { useReducer, useState } from 'react';
import { FaAddressCard } from 'react-icons/fa';
import {
	InputAddressReducer,
	initialState,
} from '~/reducer/InputAddressReducer';
import { api } from '~/utils/api';
import NoData from '../NoData/NoData';
import UserAddressCard from './UserAddressCard';
import UserAddressesFormModal from './UserAddressesFormModal';
import UserOrders from './UserOrders';

const UserMain = () => {
	const { data: user } = api.users.get.useQuery();
	const [edit, setEdit] = useState(false);
	const { mutate: archivedAddress, isLoading } =
		api.addresses.archived.useMutation();
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
		archivedAddress(
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
				onError: ({ message }) => {
					toast({
						description: `${message}`,
						status: 'error',
						isClosable: true,
					});
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
				firstName: user.firstName ?? '',
				contactPhone: address.contactPhone,
				lastName: user.lastName ?? '',
				point: address.point,
				email: user.email ?? '',
				idAddress: input.idAddress,
				password: '',
				saveAcc: false,
				
			},
		});
		setEdit(true);
		onToggle();
	};
	return (
		<Grid
			w="100%"
			templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)']}
			gap={[5]}
			justifyContent={['center', 'space-between']}
		>
			<GridItem w="100%">
				<Stack gap={[5]}>
					<Stack direction="row" justifyContent="center">
						<Avatar
							size={['lg', '2xl']}
							src={user.profileImageUrl}
						/>
						<Stack fontSize={[14, 16]}>
							<Text>{user.email}</Text>
							<Stack direction="row">
								<Text>{user.firstName}</Text>
								<Text>{user.lastName}</Text>
							</Stack>
						</Stack>
					</Stack>
					<Stack justifyContent="center" alignItems="center">
						<Stack
							direction="row"
							gap={5}
							alignItems="center"
							flexWrap="wrap"
							justifyContent="center"
						>
							<Button
								size={['sm', 'md']}
								variant="outline"
								onClick={() => handlAdd()}
								w={['50%', '100%']}
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
							<AnimatePresence>
								{user.address?.filter(
									(address) => !address.archived
								).length === 0 ? (
									<NoData
										icon={FaAddressCard}
										text="Пока что нет адресов"
									/>
								) : (
									user.address
										?.filter((address) => !address.archived)
										.map((address) => {
											return (
												<UserAddressCard
													key={address.id}
													address={address}
													email={user.email}
													firstName={user.firstName}
													lastName={user.lastName}
													handlDeletAddress={
														handlDeletAddress
													}
													handlEdit={handlEdit}
													isLoading={isLoading}
												/>
											);
										})
								)}
							</AnimatePresence>
						</Stack>
					</Stack>
				</Stack>
			</GridItem>
			<GridItem w="100%">
				<UserOrders />
			</GridItem>
		</Grid>
	);
};

export default UserMain;
