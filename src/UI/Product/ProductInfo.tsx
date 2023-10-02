import { Stack, Text } from '@chakra-ui/react';
import { useProductCardContext } from '~/context/productCardContext';

const ProductInfo = () => {
	const { product, role } = useProductCardContext();
	return (
		<Stack fontSize={16} textAlign="center">
			<Text>{product.name}</Text>
		</Stack>
	);
};

export default ProductInfo;
