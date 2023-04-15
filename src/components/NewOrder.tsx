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
} from '@chakra-ui/react';
import UserAddressCard from './User/UserAddressCard';
import { api } from '~/utils/api';
import CartItem from './Cart/CartItem';
import { useCart } from '~/context/cartContext';

type NewOrderProps = {
	isOpen: boolean;
	onClose: () => void;
};

const NewOrder = ({ isOpen, onClose }: NewOrderProps) => {
	const { data: user } = api.users.get.useQuery();
	const { cartState } = useCart();
	if (!user) return null;
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent maxW={['50%']}>
				<ModalHeader>Новый заказ</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
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
					<Button>Оформить</Button>
					<Button>Отмена</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default NewOrder;
