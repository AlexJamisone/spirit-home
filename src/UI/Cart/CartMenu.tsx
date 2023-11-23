import { Link } from '@chakra-ui/next-js';
import {
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
} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SlHandbag } from 'react-icons/sl';
import ButtonsGroup from '~/components/ButtonsGroup';
import Counter from '~/components/Counter';
import { useCart } from '~/context/cartContext';
import CartItem from './CartItem';

const CartMenu = () => {
	const [isLength, setIsLength] = useState(false);
	const { cartState } = useCart();
	useEffect(() => {
		setIsLength(cartState.items.length > 0);
	}, [isLength, cartState.items.length]);
	return (
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

					<MenuList p={[2, 5]} zIndex={20}>
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
						{cartState.items.length !== 0 && (
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
									as={Link}
									w="100%"
									href={'/new-order'}
									_hover={{
										textDecoration: 'none',
									}}
									onClick={() => {
										closeCart();
									}}
								>
									Оформить заказ
								</Button>
							</>
						)}
					</MenuList>
				</>
			)}
		</Menu>
	);
};

export default CartMenu;
