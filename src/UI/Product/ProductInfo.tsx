import { Stack, Text } from '@chakra-ui/react';
import { useProductCardContext } from '~/context/productCardContext';

const ProductInfo = () => {
	const { product } = useProductCardContext();
	return (
		<Stack
			fontWeight={400}
			textColor="second"
			fontSize={16}
			textAlign="center"
		>
			<Text>{product.name}</Text>
		</Stack>
	);
};

export default ProductInfo;
