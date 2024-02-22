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
	Text,
} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { LuShoppingCart } from 'react-icons/lu';
import ButtonsGroup from '~/components/ButtonsGroup';
import Counter from '~/components/Counter';
import TotalSum from '~/components/TotalSum';
import { useCart } from '~/stores/useCart';
import CartItem from './CartItem';

const CartMenu = () => {
	const items = useCart((state) => state.items);
	const total = useCart((state) => state.total);
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
									as={LuShoppingCart}
									boxSize={'22px'}
									color="second"
								/>
							}
							py={5}
							variant="ghost"
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
								<TotalSum />
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
