import { Button, Stack, Tag, Text } from '@chakra-ui/react';
import { useProductCardContext } from '~/context/productContext';

const ProductInfo = () => {
	const { product, admin, handlAddToCart } = useProductCardContext();
	return (
		<>
			<Stack fontSize={16} textAlign="center">
				<Text>{product.name}</Text>
				<Text
					fontSize={12}
					textColor={'gray.500'}
					maxH="100px"
					borderBottom="none"
					boxShadow="inset 0 -10px 10px -10px rgba(0, 0, 0, 0.5);"
					rounded="md"
					opacity="0.5"
					overflow="hidden"
				>
					{product.description}
				</Text>
			</Stack>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				gap={16}
			>
				<Button type="button" onClick={(e) => handlAddToCart?.(e)}>
					В корзину
				</Button>
				{admin === 'USER' ? null : <Tag>{product.categoryTitle}</Tag>}
				{admin === 'USER' ? null : (
					<Text>{`${product.quantity} шт`}</Text>
				)}

				<Text>{`${product.priceHistory[0]?.price ?? 0} ₽`}</Text>
			</Stack>
		</>
	);
};

export default ProductInfo;
