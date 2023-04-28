import {
	Box,
	Button,
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
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SlHandbag } from 'react-icons/sl';
import { useCart } from '~/context/cartContext';
import NewOrderAction from '../NewOrder/NewOrderAction';
import NewOrderAddress from '../NewOrder/NewOrderAddress';
import NewOrder from '../NewOrder/NewOrderNew';
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
			<Menu>
				<Stack position="relative">
					<MenuButton
						as={IconButton}
						fontSize={23}
						icon={<SlHandbag />}
						variant="ghost"
					/>
					<Box
						position="absolute"
						textAlign="center"
						bottom="-10px"
						right="-10px"
						zIndex="10"
						width="25px"
						height="25px"
						bgColor="gray.200"
						display={'flex'}
						justifyContent="center"
						rounded="2xl"
						opacity={`${isLength ? 1 : 0}`}
						transition={'opacity .2s linear'}
						fontWeight={600}
						cursor="pointer"
					>
						<Text suppressHydrationWarning>
							{cartState.items.length}
						</Text>
					</Box>
				</Stack>
				<MenuList p={[2, 5]} zIndex={20}>
					{cartState.items.length === 0 ? (
						<Text>Ваша Корзина пуста</Text>
					) : (
						<AnimatePresence>
							{cartState.items.map((item) => (
								<MenuItem key={item.id} justifyContent="center">
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
							<Button w="100%" onClick={onToggle}>
								Оформить заказ
							</Button>
							<NewOrder
								isOpen={isOpen}
								onClose={onClose}
								address={<NewOrderAddress />}
								action={<NewOrderAction />}
							/>
						</>
					)}
				</MenuList>
			</Menu>
		</Box>
	);
};

export default CartMenu;
