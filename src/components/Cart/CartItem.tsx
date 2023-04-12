import {
	Image,
	Spinner,
	Stack,
	Text,
	IconButton,
	Icon,
} from '@chakra-ui/react';
import React from 'react';
import { CartItem } from '~/reducer/CartReducer';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoTrashOutline } from 'react-icons/io5';
import { useCart } from '~/context/cartContext';
import type { IconType } from 'react-icons';

type CartItemProps = {
	item: CartItem;
};

const CartItem = ({
	item: { image, name, price, quantityInCart, id },
}: CartItemProps) => {
	const { cartDispatch } = useCart();
	const handlCount = (icon: IconType, action: 'plus' | 'minus') => {
		return (
			<IconButton
				variant="ghost"
				size="sm"
				aria-label={action}
				icon={<Icon as={icon} />}
				onClick={(e) => {
					if (quantityInCart === 1 && action === 'minus') {
						cartDispatch({ type: 'REMOVE_FROM_CART', payload: id });
					} else {
						cartDispatch({
							type: 'UPDATE_QT',
							payload: {
								id,
								quantity:
									action === 'plus'
										? quantityInCart + 1
										: quantityInCart - 1,
							},
						});
					}
					e.stopPropagation();
				}}
			/>
		);
	};
	return (
		<Stack
			direction="row"
			gap={10}
			p={5}
			alignItems="center"
			w="100%"
			justifyContent="space-between"
		>
			<Image
				w={[100]}
				src={`${
					process.env.NEXT_PUBLIC_SUPABASE_URL as string
				}/storage/v1/object/public/products/${image as string}`}
				alt={name}
				fallback={<Spinner />}
			/>
			<Text>{name}</Text>
			<Stack direction="row" gap={3} alignItems="center">
				{handlCount(IoIosArrowBack, 'minus')}
				<Text>{quantityInCart}</Text>
				{handlCount(IoIosArrowForward, 'plus')}
			</Stack>
			<Text>{price} ₽</Text>
			<IconButton
				variant="ghost"
				aria-label="remove"
				icon={<Icon as={IoTrashOutline} boxSize={6} color="red.500" />}
				onClick={(e) => {
					cartDispatch({ type: 'REMOVE_FROM_CART', payload: id });
					e.stopPropagation();
				}}
			/>
		</Stack>
	);
};

export default CartItem;
