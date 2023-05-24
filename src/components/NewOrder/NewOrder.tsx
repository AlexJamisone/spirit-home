import {
	FormControl,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	useToast,
} from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import type { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducer, useRef, useState, type ReactNode } from 'react';
import type {
	DaDataAddress,
	DaDataAddressSuggestion,
	DaDataSuggestion,
} from 'react-dadata';
import { useCart } from '~/context/cartContext';
import NewOrderContext from '~/context/orderContext';
import {
	InputAddressReducer,
	initialState,
} from '~/reducer/InputAddressReducer';
import { api } from '~/utils/api';
import CartItem from '../Cart/CartItem';
import NewOrderAction from './NewOrderAction';
import NewOrderAddress from './NewOrderAddress';
type NewOrderProps = {
	isOpen: boolean;
	onClose: () => void;
	address?: ReactNode;
	action?: ReactNode;
};

const NewOrder = ({ isOpen, onClose, action, address }: NewOrderProps) => {
	const {
		mutate: createWithId,
		isLoading: isLoadingId,
		isError: isErrorId,
	} = api.orders.createWithAddressId.useMutation();
	const {
		mutate: createNoAddress,
		isError: isErrorNoAddress,
		error: errorNoAddress,
		reset: resetNoAddress,
		isLoading: isLoadingNoAddreess,
	} = api.orders.createNoAddressIsAuth.useMutation();
	const {
		mutate: createNoAuth,
		isError: isErrorAnon,
		error: errorAnon,
		reset: resetNoAuth,
		isLoading: isLoadingAnon,
	} = api.orders.createNoAuth.useMutation();
	const { mutate: getPoints, data: points } =
		api.cdek.getPoints.useMutation();

	const { cartState, cartDispatch } = useCart();
	const { isSignedIn } = useAuth();
	const [input, dispatch] = useReducer(InputAddressReducer, initialState);
	const [valueSuggestion, setValueSuggestion] = useState<
		DaDataAddressSuggestion | undefined
	>();
	const toast = useToast();
	const ctx = api.useContext();
	const initialRef = useRef<HTMLInputElement>(null);

	const handlSuccess = () => {
		toast({
			description:
				'Заказ успешно оформлен, в ближайшее время с вами свжуться!',
			status: 'success',
			duration: 10000,
			isClosable: true,
		});
		void ctx.orders.invalidate();
		void ctx.users.invalidate();
		dispatch({ type: 'SET_CLEAR' });
		cartDispatch({ type: 'CLER_CART' });
		onClose();
	};

	const handlPoints = (
		suggestion: DaDataSuggestion<DaDataAddress> | undefined
	) => {
		setValueSuggestion(suggestion);
		getPoints(
			{ city: suggestion?.data.postal_code as string },
			{
				onSuccess: () => {
					dispatch({ type: 'SET_MAP', payload: true });
				},
			}
		);
	};

	const handlError = (code?: TRPC_ERROR_CODE_KEY) => {
		toast({
			description: `${
				code === 'INTERNAL_SERVER_ERROR'
					? 'Такой аккаунт уже есть'
					: 'Ошибка'
			}`,
			status: code === 'INTERNAL_SERVER_ERROR' ? 'warning' : 'error',
			duration: 5000,
			isClosable: true,
		});
	};
	const handlSubmit = () => {
		if (isSignedIn) {
			if (input.idAddress !== '') {
				createWithId(
					{
						cart: cartState,
						idAddress: input.idAddress,
					},
					{
						onSuccess: () => {
							handlSuccess();
						},
						onError: () => {
							handlError();
						},
					}
				);
			} else {
				createNoAddress(
					{
						cart: cartState,
						address: {
							contactPhone: input.contactPhone,
							firstName: input.firstName,
							lastName: input.lastName,
							point: input.point?.location.address_full as string,
						},
					},
					{
						onSuccess: () => {
							handlSuccess();
						},
						onError: ({ data }) => {
							handlError(data?.code);
						},
					}
				);
			}
		} else {
			createNoAuth(
				{
					createProfile: input.saveAcc,
					address: {
						contactPhone: input.contactPhone,
						firstName: input.firstName,
						lastName: input.lastName,
						point: input.point?.location.address_full as string,
					},
					cart: cartState,
					email: input.saveAcc ? input.email : undefined,
					password: input.saveAcc ? input.password : undefined,
				},
				{
					onSuccess: () => {
						handlSuccess();
					},
					onError: ({ data }) => {
						handlError(data?.code);
					},
				}
			);
		}
	};
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				dispatch({ type: 'SET_CLEAR' });
				onClose();
			}}
			initialFocusRef={initialRef}
			size={['xl', '2xl']}
		>
			<ModalOverlay />
			<ModalContent mx={[5, null]} as={motion.section} layout>
				<NewOrderContext.Provider
					value={{
						input,
						dispatch,
						handlSubmit,
						isSignedIn,
						onClose,
						initialRef,
						resetNoAuth,
						resetNoAddress,
						passwordLengthError: errorAnon?.message,
						isLoading:
							isLoadingId || isLoadingAnon || isLoadingNoAddreess,
						isError: isErrorId || isErrorAnon || isErrorNoAddress,
						error:
							errorAnon?.data?.zodError?.fieldErrors?.address ||
							errorNoAddress?.data?.zodError?.fieldErrors
								?.address,
						handlPoints,
						points,
						valueSuggestion,
						setValueSuggestion,
					}}
				>
					<ModalHeader textAlign="center">Новый заказ</ModalHeader>
					<ModalCloseButton />
					<FormControl
						as="form"
						onSubmit={(e) => {
							e.preventDefault();
							handlSubmit();
						}}
						display="flex"
						gap={5}
					>
						<ModalBody
							as={Stack}
							justifyContent="center"
							direction="column"
						>
							<Stack>{address}</Stack>
							<Stack direction="column" justifyContent="center">
								<AnimatePresence>
									{cartState.items.map((item) => (
										<CartItem item={item} key={item.id} />
									))}
								</AnimatePresence>
							</Stack>
							<ModalFooter gap={5}>{action}</ModalFooter>
						</ModalBody>
					</FormControl>
				</NewOrderContext.Provider>
			</ModalContent>
		</Modal>
	);
};

NewOrder.Action = NewOrderAction;
NewOrder.Address = NewOrderAddress;

export default NewOrder;
