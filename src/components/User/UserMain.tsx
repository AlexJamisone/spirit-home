import {
	Avatar,
	Button,
	Grid,
	GridItem,
	Input,
	Stack,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { useClerk } from '@clerk/nextjs';
import type { Address, Point } from '@prisma/client';
import { AnimatePresence } from 'framer-motion';
import { useReducer, useRef, type ChangeEvent } from 'react';
import type { AddressSuggestions } from 'react-dadata';
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
	const { mutate: archivedAddress, isLoading } =
		api.addresses.archived.useMutation();
	const ctx = api.useContext();
	const { user: userClerk } = useClerk();
	const { isOpen, onClose, onToggle } = useDisclosure();
	const toast = useToast();
	const suggestionsRef = useRef<AddressSuggestions>(null);
	const [input, dispatch] = useReducer(InputAddressReducer, initialState);
	if (!user) return null;
	const handlAdd = () => {
		if (user.firstName && user.lastName) {
			dispatch({ type: 'SET_NAME', payload: user.firstName });
			dispatch({ type: 'SET_LAST_NAME', payload: user.lastName });
		}
		onToggle();
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
	const handlEdit = (
		address: Address & {
			point: Point | null;
		}
	) => {
		dispatch({
			type: 'SET_ALL',
			payload: {
				id: address.id,
				firstName: address.firstName ?? '',
				contactPhone: address.contactPhone,
				lastName: address.lastName ?? '',
				email: user?.email ?? '',
				idAddress: input.idAddress,
				password: '',
				saveAcc: false,
				errorSelectedPVZ: false,
				selectedPVZ: true,
				showMap: false,
				showPVZ: true,
				point: address.point as Point,
				edit: true,
			},
		});
		onToggle();
	};
	const handlAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			try {
				await userClerk?.setProfileImage({ file: e.target.files[0] });
				await userClerk?.reload();
				toast({
					description: 'Аватарка успешно обновлена!',
					isClosable: true,
					status: 'success',
				});
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
		<Grid
			w="100%"
			templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)']}
			gap={[5]}
			justifyContent={['center', 'space-between']}
		>
			<GridItem w="100%">
				<Stack gap={[5]}>
					<Stack direction="row" justifyContent="center">
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
						<Stack fontSize={[14, 16]}>
							<Text>{user.email}</Text>
							<Stack direction="row">
								<Text>{user.firstName}</Text>
								<Text>{user.lastName}</Text>
							</Stack>
						</Stack>
					</Stack>
					{/* Info */}
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
							{/* Action */}
							<UserAddressesFormModal
								isOpen={isOpen}
								onClose={onClose}
								input={input}
								dispatch={dispatch}
								suggestionsRef={suggestionsRef}
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
							{/* Address Cards */}
						</Stack>
					</Stack>
				</Stack>
			</GridItem>
			<GridItem justifyItems="center">
				<UserOrders />
			</GridItem>
		</Grid>
	);
};

export default UserMain;
