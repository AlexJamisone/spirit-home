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
import { SlHandbag } from 'react-icons/sl';
import ButtonsGroup from '~/components/ButtonsGroup';
import Counter from '~/components/Counter';
import { useCart } from '~/stores/useCart';
import CartItem from './CartItem';

const CartMenu = () => {
	const { items, total } = useCart();
	return (
		<Menu autoSelect={false}>
			{({ onClose: closeCart }) => (
				<>
					<ButtonsGroup>
						<Counter length={items.length} />
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
						{items.length === 0 ? (
							<Text>Ваша Корзина пуста</Text>
						) : (
							<AnimatePresence>
								{items.map((item, index) => (
									<MenuItem
										key={index}
										justifyContent="center"
									>
										<CartItem item={item} />
									</MenuItem>
								))}{' '}
							</AnimatePresence>
						)}
						{items.length !== 0 && (
							<>
								<MenuDivider />
								<Stack
									direction="row"
									justifyContent="space-between"
									p={2}
								>
									<Text>Итог: </Text>
									<Text fontWeight={600}>{total} ₽</Text>
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
