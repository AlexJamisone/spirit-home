import { Stack } from '@chakra-ui/react';
import { useReducer } from 'react';
import ProductPlaceholder from '~/components/NoData/ProductPlaceholder';
import ProductContext from '~/context/productContext';
import {
	initial,
	productDitailsReducer,
} from '~/reducer/ProductDitailsReducer';
import { api } from '~/utils/api';
import ProductDitailsInfo from './ProductDitailsInfo';
import ProductImageSlider from './ProductImageSlider';

const ProductDitails = ({ query }: { query: string }) => {
	const { data: product, isLoading } = api.products.getSinglProduct.useQuery({
		id: query,
	});
	const [productDitalState, prodAction] = useReducer(
		productDitailsReducer,
		initial
	);
	if (!product || isLoading) {
		return <ProductPlaceholder />;
	}
	return (
		<ProductContext.Provider
			value={{ product, productDitalState, prodAction }}
		>
			<Stack direction="row" gap={20}>
				<ProductImageSlider />
				<ProductDitailsInfo />
			</Stack>
		</ProductContext.Provider>
	);
};

export default ProductDitails;
