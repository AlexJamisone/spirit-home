import { Text } from '@chakra-ui/react';
import { useProductCardContext } from '~/context/productCardContext';

const ProductPrice = () => {
	const { product } = useProductCardContext();
	return (
		<Text fontWeight={600}>{`${
			product.priceHistory[0]?.price ?? 0
		} ₽`}</Text>
	);
};

export default ProductPrice;
