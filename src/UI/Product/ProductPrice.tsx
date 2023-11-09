import { Text } from '@chakra-ui/react';
import { useProductCardContext } from '~/context/productCardContext';

const ProductPrice = () => {
	const { product } = useProductCardContext();
	return (
		<Text textColor="second" fontWeight={600}>{`${product.price} ₽`}</Text>
	);
};

export default ProductPrice;
