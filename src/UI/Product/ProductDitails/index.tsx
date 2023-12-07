import { Stack } from '@chakra-ui/react';
import ProductPlaceholder from '~/components/NoData/ProductPlaceholder';
import { useProduct } from '~/hooks/useProduct';
import ProductDitailsInfo from './ProductDitailsInfo';
import ProductImageSlider from './ProductImageSlider';

const ProductDitails = () => {
	const { product, isLoading } = useProduct();
	if (!product || isLoading) {
		return <ProductPlaceholder />;
	}
	return (
		<Stack direction="row" gap={20}>
			<ProductImageSlider />
			<ProductDitailsInfo />
		</Stack>
	);
};

export default ProductDitails;
