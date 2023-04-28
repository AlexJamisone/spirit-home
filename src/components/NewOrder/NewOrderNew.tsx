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
import { AnimatePresence } from 'framer-motion';
import { useReducer, type ReactNode } from 'react';
import { useCart } from '~/context/cartContext';
import NewOrderContext from '~/context/orderContext';
import {
	InputAddressReducer,
	initialState,
} from '~/reducer/InputAddressReducer';
import { api } from '~/utils/api';
import CartItem from '../Cart/CartItem';

type NewOrderProps = {
	isOpen: boolean;
	onClose: () => void;
	address?: ReactNode;
	action?: ReactNode;
};

const NewOrder = ({ isOpen, onClose, action, address }: NewOrderProps) => {
	const {
		mutate: create,
		isLoading,
		isError,
	} = api.orders.create.useMutation();
	const { cartState, cartDispatch } = useCart();
	const { isSignedIn } = useAuth();
	const [input, dispatch] = useReducer(InputAddressReducer, initialState);
	const toast = useToast();
	const ctx = api.useContext();
	const handlSubmit = () => {
		create(
			{
				cart: cartState,
				isAuth: isSignedIn as boolean,
				address: {
					city: input.citys,
					contactPhone: input.contactPhone,
					firstName: input.firstName,
					lastName: input.lastName,
					point: input.point,
				},
				createUser: input.saveAcc,
				email: input.email,
				idAddress: input.idAddress,
				password: input.password,
				saveAddress: input.saveAddress,
			},
			{
				onSuccess: () => {
					toast({
						description: `Заказ успешно создан🚀`,
						status: 'success',
					});
					void ctx.users.invalidate();
					cartDispatch({ type: 'CLER_CART' });
					onClose();
				},
				onError: ({ data }) => {
					data?.zodError?.fieldErrors.addressObject?.map((error) =>
						toast({
							description: `${error}`,
							status: 'error',
							isClosable: true,
						})
					);
				},
			}
		);
	};
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				dispatch({ type: 'SET_CLEAR' });
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent mx={5}>
				<ModalHeader textAlign="center">Новый заказ</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<NewOrderContext.Provider
						value={{
							input,
							dispatch,
							handlSubmit,
							isSignedIn,
							isLoading,
							onClose,
						}}
					>
						<FormControl
							isInvalid={isError}
							as="form"
							onSubmit={(e) => {
								e.preventDefault();
								handlSubmit();
							}}
						>
							{address}
							<Stack direction="column" justifyContent="center">
								<AnimatePresence>
									{cartState.items.map((item) => (
										<CartItem item={item} key={item.id} />
									))}
								</AnimatePresence>
							</Stack>
							<ModalFooter gap={5}>{action}</ModalFooter>
						</FormControl>
					</NewOrderContext.Provider>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default NewOrder;
