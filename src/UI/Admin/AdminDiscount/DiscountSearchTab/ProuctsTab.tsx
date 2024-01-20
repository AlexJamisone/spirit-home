import { Input, Stack, TabPanel } from '@chakra-ui/react';
import { useDebounce } from '@uidotdev/usehooks';
import { useSearch } from '~/stores/useSearch';
import { api } from '~/utils/api';
import ProductStick from './ProductStick';

const ProductsTab = () => {
	const { query, setSearch } = useSearch();
	const { data: products } = api.products.getWithSearch.useQuery({
		search: useDebounce(query, 1000),
	});
	return (
		<TabPanel>
			<Stack px={3} maxH={300} overflowY={'auto'} position='relative'>
				<Stack position={'sticky'} top={0} zIndex={20} bgColor='white'>
					<Input
						placeholder="Поиск продукта"
                        zIndex={20}
						value={query}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</Stack>
				{products &&
					products.map((product) => (
						<ProductStick product={product} key={product.id} />
					))}
			</Stack>
		</TabPanel>
	);
};
export default ProductsTab;
