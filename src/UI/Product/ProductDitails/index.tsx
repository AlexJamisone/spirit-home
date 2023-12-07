import { Stack } from '@chakra-ui/react';
import ProductPlaceholder from '~/components/NoData/ProductPlaceholder';
import { api } from '~/utils/api';
import ProductAction from './ProductAction';
import ProductDitailsInfo from './ProductDitailsInfo';
import ProductImageSlider from './ProductImageSlider';

const ProductDitails = ({ query }: { query: string }) => {
	const { data: product, isLoading } = api.products.getSinglProduct.useQuery({
		id: query,
	});
	if (!product || isLoading) {
		return <ProductPlaceholder />;
	}
	return (
		<Stack direction="row" gap={20}>
			<ProductImageSlider />
			<ProductDitailsInfo />
			<ProductAction />
		</Stack>
	);
};

export default ProductDitails;
