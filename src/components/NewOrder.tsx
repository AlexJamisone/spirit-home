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
	FormControl,
	RadioGroup,
} from '@chakra-ui/react';
import UserAddressCard from './User/UserAddressCard';
import { api } from '~/utils/api';
import CartItem from './Cart/CartItem';
import { useCart } from '~/context/cartContext';
import { useState } from 'react';

type NewOrderProps = {
	isOpen: boolean;
	onClose: () => void;
};

const NewOrder = ({ isOpen, onClose }: NewOrderProps) => {
	const { data: user } = api.users.get.useQuery();
	const { mutate: createOrder, isLoading } = api.orders.create.useMutation();
	const { cartState, cartDispatch } = useCart();
	const [address, setAddress] = useState('');
	const toast = useToast();
	const ctx = api.useContext();
	if (!user) return null;
	const handlSubmit = (idAddress: string) => {
		createOrder(
			{ cart: cartState, address: idAddress },
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
		<Modal
			isOpen={isOpen}
			onClose={() => {
				setAddress('');
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent maxW={['50%']}>
				<ModalHeader>Новый заказ</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl
						as="form"
						onSubmit={(e) => {
							e.preventDefault();
							handlSubmit(address);
						}}
						isRequired
					>
						<Stack gap={5} direction="column">
							<RadioGroup onChange={setAddress} value={address}>
								<Stack
									direction="row"
									gap={3}
									flexWrap="wrap"
									justifyContent="center"
								>
									{user.address?.map((address) => (
										<Radio
											key={address.id}
											value={address.id}
										>
											<UserAddressCard
												address={address}
												email={user.email}
												firstName={user.firstName}
												lastName={user.lastName}
												cantEdit={true}
											/>
										</Radio>
									))}
								</Stack>
							</RadioGroup>
							{cartState.items.map((item) => (
								<CartItem item={item} key={item.id} />
							))}
						</Stack>
						<ModalFooter gap={5}>
							<Button type="submit" isLoading={isLoading}>
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
