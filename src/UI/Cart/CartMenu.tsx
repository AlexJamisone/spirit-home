import {
	Box,
	Button,
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SlHandbag } from 'react-icons/sl';
import ButtonsGroup from '~/components/ButtonsGroup';
import Counter from '~/components/Counter';
import { useCart } from '~/context/cartContext';
import NewOrder from '../NewOrder/NewOrder';
import CartItem from './CartItem';

const CartMenu = () => {
	const [isLength, setIsLength] = useState(false);
	const { cartState } = useCart();
	const { isOpen, onClose, onToggle } = useDisclosure();
	useEffect(() => {
		setIsLength(cartState.items.length > 0);
	}, [isLength, cartState.items.length]);
	return (
		<Box>
			<Menu autoSelect={false}>
				{({ onClose: closeCart }) => (
					<>
						<ButtonsGroup>
							<Counter length={cartState.items.length} />
							<MenuButton
								as={IconButton}
								icon={
									<Icon
										as={SlHandbag}
										fill="second"
										boxSize={4}
									/>
								}
								py={5}
								variant="outline"
								position="relative"
								borderColor="second"
								size={'md'}
							/>
						</ButtonsGroup>

						<MenuList
							p={[2, 5]}
							zIndex={20}
							as={motion.div}
							initial={{ height: 'auto' }}
							animate={{ height: 'auto' }}
							exit={{ height: 0 }}
						>
							{cartState.items.length === 0 ? (
								<Text>Ваша Корзина пуста</Text>
							) : (
								<AnimatePresence>
									{cartState.items.map((item, index) => (
										<MenuItem
											key={index}
											justifyContent="center"
										>
											<CartItem item={item} />
										</MenuItem>
									))}{' '}
								</AnimatePresence>
							)}
							{cartState.items.length === 0 ? null : (
								<>
									<MenuDivider />
									<Stack
										direction="row"
										justifyContent="space-between"
										p={2}
									>
										<Text>Итог: </Text>
										<Text fontWeight={600}>
											{cartState.totalPrice} ₽
										</Text>
									</Stack>
									<MenuDivider />
									<Button
										w="100%"
										onClick={() => {
											closeCart();
											onToggle();
										}}
									>
										Оформить заказ
									</Button>
									<NewOrder
										isOpen={isOpen}
										onClose={onClose}
										address={<NewOrder.Address />}
										action={<NewOrder.Action />}
									/>
								</>
							)}
						</MenuList>
					</>
				)}
			</Menu>
		</Box>
	);
};

export default CartMenu;
