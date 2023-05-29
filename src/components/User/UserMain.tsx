import {
	Grid,
	GridItem,
	Stack,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { useClerk } from '@clerk/nextjs';
import type { Address, Point } from '@prisma/client';
import { useReducer, useRef, type ChangeEvent, type ReactNode } from 'react';
import type { AddressSuggestions } from 'react-dadata';
import UserMainContext from '~/context/userMainContext';
import {
	InputAddressReducer,
	initialState,
} from '~/reducer/InputAddressReducer';
import { api } from '~/utils/api';
import UserAction from './Action/UserAction';
import UserInfo from './Info/UserInfo';
import UserAddressList from './UserAddressList';
import UserAddressesFormModal from './UserAddressesFormModal';
import UserOrders from './UserOrders';

type UserMainProps = {
	info?: ReactNode;
	addressList?: ReactNode;
	action?: ReactNode;
	orders?: ReactNode;
};

const UserMain = ({ info, action, addressList, orders }: UserMainProps) => {
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
		<UserMainContext.Provider
			value={{
				handlAvatar,
				user,
				handlEdit,
				dispatch,
				input,
				suggestionsRef,
				handlDeletAddress,
				isLoading,
				handlAdd,
			}}
		>
			<Grid
				templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)']}
				gap={[5]}
				justifyContent={['center', 'space-between']}
				px={[0, 100]}
			>
				<GridItem>
					<Stack
						gap={[5]}
						justifyContent="center"
						alignItems="center"
					>
						{info}
						{action}
						<Stack
							direction={['column', 'row']}
							flexWrap="wrap"
							justifyContent="center"
							alignItems="center"
							gap={2}
						>
							{addressList}
						</Stack>
						<UserAddressesFormModal
							isOpen={isOpen}
							onClose={onClose}
						/>
					</Stack>
				</GridItem>
				<GridItem>{orders}</GridItem>
			</Grid>
		</UserMainContext.Provider>
	);
};

UserMain.Info = UserInfo;
UserMain.Orders = UserOrders;
UserMain.AddressList = UserAddressList;
UserMain.Action = UserAction;

export default UserMain;
