import {
	Button,
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
import { useReducer, useState } from 'react';
import { useCart } from '~/context/cartContext';
import {
	InputAddressReducer,
	initialState,
} from '~/reducer/InputAddressReducer';
import { api } from '~/utils/api';
import AddressCreate from './AddressCreate';
import CartItem from './Cart/CartItem';
import UserAddressList from './User/UserAddressList';

type NewOrderProps = {
	isOpen: boolean;
	onClose: () => void;
};

export type Info = {
	acc: boolean;
	save: boolean;
	email: string;
	password: string;
};

const NewOrder = ({ isOpen, onClose }: NewOrderProps) => {
	const { mutate: createOrder, isLoading } =
		api.orders.createWithAuth.useMutation();
	const { mutate: createOrderNotAuth, isLoading: otherLoading } =
		api.orders.createNotAuth.useMutation();
	const { isSignedIn } = useAuth();
	const { cartState, cartDispatch } = useCart();
	const [address, setAddress] = useState('');
	const [input, dispatch] = useReducer(InputAddressReducer, initialState);
	const [info, setInfo] = useState<Info>({
		acc: false,
		save: false,
		email: '',
		password: '',
	});
	const toast = useToast();
	const ctx = api.useContext();
	const handlSubmit = (idAddress: string) => {
		createOrder(
			{
				cart: cartState,
				address: idAddress,
				addressObject: {
					city: input.citys,
					contactPhone: input.contactPhone,
					firstName: input.firstName,
					lastName: input.lastName,
					point: input.point,
				},
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
			}
		);
	};
	const handlSubmitAnon = () => {
		createOrderNotAuth(
			{
				email: info.email,
				createUser: info.acc,
				saveAddress: info.save,
				cart: cartState,
				firstName: input.firstName,
				lastName: input.lastName,
				password: info.password,
				address: {
					city: input.citys,
					contactPhone: input.contactPhone,
					point: input.point,
				},
			},
			{
				onSuccess: () => {
					toast({
						description:
							'Заказ успешно создан в ближайшее время с вами свяжится оператор!',
						status: 'success',
					});
					dispatch({ type: 'SET_CLEAR' });
					setInfo({
						acc: false,
						email: '',
						password: '',
						save: false,
					});
					cartDispatch({ type: 'CLER_CART' }), onClose();
				},
			}
		);
	};
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				setAddress('');
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent maxW={['100%', '50%']} mx={[5, null]}>
				<ModalHeader>Новый заказ</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl
						as="form"
						onSubmit={(e) => {
							e.preventDefault();
							if (isSignedIn) {
								handlSubmit(address);
							} else {
								handlSubmitAnon();
							}
						}}
					>
						<Stack gap={5} direction="column">
							{isSignedIn ? (
								<UserAddressList
									dispatch={dispatch}
									info={info}
									input={input}
									setInfo={setInfo}
									address={address}
									setAddress={setAddress}
									isAuth={isSignedIn}
								/>
							) : (
								<AddressCreate
									dispatch={dispatch}
									input={input}
									info={info}
									setInfo={setInfo}
								/>
							)}
							<AnimatePresence>
								{cartState.items.map((item) => (
									<CartItem item={item} key={item.id} />
								))}
							</AnimatePresence>
						</Stack>
						<ModalFooter gap={5}>
							<Button
								type="submit"
								isLoading={
									isSignedIn ? isLoading : otherLoading
								}
							>
								Оформить
							</Button>
							<Button
								onClick={() => {
									setAddress('');
									onClose();
								}}
							>
								Отмена
							</Button>
						</ModalFooter>
					</FormControl>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default NewOrder;
