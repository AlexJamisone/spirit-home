import { Heading, Stack, Text } from '@chakra-ui/react';
import { useProduct } from '~/hooks/useProduct';
import ProductAction from './ProductAction';
import ProductDescription from './ProductDescription';
import ProductSize from './ProductSize';

const ProductDitailsInfo = () => {
	const { product } = useProduct();
	return (
		<Stack
			alignItems="center"
			justifyContent="space"
			cursor="default"
			gap={{
				xl: 3,
				'2xl': 7,
			}}
		>
			<Heading>{product?.name}</Heading>
			<Text
				fontSize={'2xl'}
				fontWeight={600}
				fontFamily={`'Jost', sans-serif`}
			>
				{product?.price} ₽
			</Text>
			<ProductSize />
			<ProductDescription />
			<ProductAction />
		</Stack>
	);
};

export default ProductDitailsInfo;
