import { Grid, GridItem } from '@chakra-ui/react';
import { api } from '~/utils/api';
import ProductsCard from '../Product/ProductCard';

const MainProductCards = () => {
	const { data: products } = api.products.getForAllv1.useQuery();
	const handlGrid = (idx: number) => {
		switch (idx) {
			case 0:
				return '1 / 1 / 2 / 2 ';
			case 1:
				return '1 / 2 / 2 / 3';
			case 2:
				return '1 / 3 / 3 / 5';
			case 3:
				return '2 / 1 / 4 / 3';
			case 4:
				return '4 / 3 / 3 / 4';
			case 5:
				return '4 / 4 / 3 / 5';
		}
	};
	return (
		<Grid
			gridTemplateColumns="repeat(4, 1fr)"
			placeItems="end"
			columnGap={'19px'}
			rowGap={'40px'}
		>
			{products?.map((product, idx) => (
				<GridItem
					gridArea={handlGrid(idx)}
					placeSelf={idx === 3 ? 'start' : undefined}
					key={product.id}
				>
					<ProductsCard
						product={product}
						role="USER"
						isBig={idx === 2 || idx === 3}
					/>
				</GridItem>
			))}
		</Grid>
	);
};
export default MainProductCards;
