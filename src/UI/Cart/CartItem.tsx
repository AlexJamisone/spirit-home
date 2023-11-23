import {
	Icon,
	IconButton,
	Image,
	Spinner,
	Stack,
	Tag,
	Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoTrashOutline } from 'react-icons/io5';
import { env } from '~/env.mjs';
import { CartItem } from '~/reducer/CartReducer';
import { useCart } from '~/stores/useCart';

type CartItemProps = {
	item: CartItem;
};

const CartItem = ({
	item: { image, title, quantity, id, price, size },
}: CartItemProps) => {
	const { update, remove } = useCart();
	const handlCount = (icon: IconType, action: 'plus' | 'minus') => {
		return (
			<IconButton
				variant="ghost"
				size={['xs', 'sm']}
				aria-label={action}
				icon={<Icon as={icon} />}
				onClick={(e) => {
					if (quantity === 1 && action === 'minus') {
						remove(id, size);
					} else {
						update(
							id,
							size,
							action === 'plus' ? quantity + 1 : quantity - 1
						);
					}
					e.stopPropagation();
				}}
			/>
		);
	};
	return (
		<Stack
			as={motion.div}
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: { type: 'spring', duration: 0.3 },
			}}
			exit={{ opacity: 0, transition: { type: 'tween' } }}
			direction="row"
			gap={[0, 3]}
			alignItems="center"
			justifyContent="center"
			w="100%"
			fontSize={[12, 16]}
		>
			<Image
				w={[70, 75]}
				h={[70, 75]}
				objectFit="contain"
				src={`${env.NEXT_PUBLIC_UPLOADTHING_URL}${image}`}
				alt={title}
				fallback={<Spinner />}
			/>
			<Text display="inline-block" w="100%" textAlign="center">
				{title}
			</Text>
			<Stack direction="row" alignItems="center">
				{handlCount(IoIosArrowBack, 'minus')}
				<Text>{quantity}</Text>
				{handlCount(IoIosArrowForward, 'plus')}
			</Stack>
			<Text
				display="inline-block"
				w="100%"
				textAlign="center"
				fontSize={[12, 16]}
			>
				{price} ₽
			</Text>

			<Stack>
				<Tag size={['sm', 'md']} textAlign="center">
					{size}
				</Tag>
			</Stack>
			<IconButton
				variant="ghost"
				size={['xs', 'sm']}
				aria-label="remove"
				icon={
					<Icon
						as={IoTrashOutline}
						boxSize={[4, 5]}
						color="red.500"
					/>
				}
				onClick={(e) => {
					remove(id, size);
					e.stopPropagation();
				}}
			/>
		</Stack>
	);
};

export default CartItem;
