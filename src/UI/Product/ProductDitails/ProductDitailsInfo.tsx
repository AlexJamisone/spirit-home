import { Heading, Stack } from '@chakra-ui/react';
import { useProductContext } from '~/context/productContext';
import ProductAction from './ProductAction';
import ProductDescription from './ProductDescription';
import ProductSize from './ProductSize';

const ProductDitailsInfo = () => {
	const {
		product: { name },
	} = useProductContext();
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
			<Heading>{name}</Heading>
			<ProductSize />
			<ProductDescription />
			<ProductAction />
		</Stack>
	);
};

export default ProductDitailsInfo;
