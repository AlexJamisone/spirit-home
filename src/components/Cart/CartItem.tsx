import {
	Icon,
	IconButton,
	Image,
	Spinner,
	Stack,
	Text,
} from '@chakra-ui/react';
import type { IconType } from 'react-icons';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoTrashOutline } from 'react-icons/io5';
import { useCart } from '~/context/cartContext';
import { CartItem } from '~/reducer/CartReducer';

type CartItemProps = {
	item: CartItem;
};

const CartItem = ({
	item: { image, name, quantityInCart, id, priceHistory },
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
			gap={3}
			p={5}
			alignItems="center"
			minW="100%"
			justifyContent="space-between"
		>
			<Image
				w={[100]}
				h={[90]}
				objectFit="contain"
				src={`${
					process.env.NEXT_PUBLIC_SUPABASE_URL as string
				}/storage/v1/object/public/products/${image[0] as string}`}
				alt={name}
				fallback={<Spinner />}
			/>
			<Text>{name}</Text>
			<Stack direction="row" gap={3} alignItems="center">
				{handlCount(IoIosArrowBack, 'minus')}
				<Text>{quantityInCart}</Text>
				{handlCount(IoIosArrowForward, 'plus')}
			</Stack>
			<Text>{priceHistory[0]?.price} ₽</Text>
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
