import { Heading, Stack } from '@chakra-ui/react';
import { api } from '~/utils/api';
import ProductDescription from './ProductDescription';
import ProductSize from './ProductSize';

const ProductDitailsInfo = () => {
	const ctx = api.useContext();
	const data = ctx.products.getSinglProduct.getData();
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
			<Heading>{data?.name}</Heading>
			<ProductSize />
			<ProductDescription />
		</Stack>
	);
};

export default ProductDitailsInfo;
