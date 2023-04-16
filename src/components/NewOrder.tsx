import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Radio,
	Button,
	Stack,
	useToast,
} from '@chakra-ui/react';
import UserAddressCard from './User/UserAddressCard';
import { api } from '~/utils/api';
import CartItem from './Cart/CartItem';
import { useCart } from '~/context/cartContext';
import { CartState } from '~/reducer/CartReducer';

type NewOrderProps = {
	isOpen: boolean;
	onClose: () => void;
};

const NewOrder = ({ isOpen, onClose }: NewOrderProps) => {
	const { data: user } = api.users.get.useQuery();
	const { mutate: createOrder, isLoading } = api.orders.create.useMutation();
	const { cartState, cartDispatch } = useCart();
	const toast = useToast();
	const ctx = api.useContext();
	if (!user) return null;
	const handlCreate = () => {
		createOrder(
			{ cart: cartState },
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
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent maxW={['40%']}>
				<ModalHeader>Новый заказ</ModalHeader>
				<ModalCloseButton />
				<ModalBody minW={['100%']}>
					<Stack gap={5} direction="column">
						{user.address?.map((address) => (
							<Radio key={address.id}>
								<UserAddressCard
									address={address}
									email={user.email}
									firstName={user.firstName}
									lastName={user.lastName}
									cantEdit={true}
								/>
							</Radio>
						))}
						{cartState.items.map((item) => (
							<CartItem item={item} key={item.id} />
						))}
					</Stack>
				</ModalBody>
				<ModalFooter gap={5}>
					<Button isLoading={isLoading} onClick={handlCreate}>
						Оформить
					</Button>
					<Button>Отмена</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default NewOrder;
