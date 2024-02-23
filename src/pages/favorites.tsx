import { Spinner } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { TiHeartOutline } from 'react-icons/ti';
import ProductsCard from '~/UI/Product/ProductCard';
import Layout from '~/components/Layout';
import NoData from '~/components/NoData/NoData';
import { useFavorites } from '~/stores/useFavorites';
import { api } from '~/utils/api';

const FavoritesPage = () => {
	const ids = useFavorites((state) => state.ids);
	const { data: products } = api.products.getByFavorites.useQuery({
		ids,
	});
	if (!products)
		return (
			<Layout>
				<Spinner />
			</Layout>
		);
	if (ids.length === 0)
		return (
			<Layout>
				<NoData icon={TiHeartOutline} text="В избранном пусто :(" />
			</Layout>
		);

	return (
		<Layout>
			<AnimatePresence>
				{products?.map((product) => (
					<ProductsCard
						isBig={false}
						key={product.id}
						product={product}
						role="USER"
					/>
				))}
			</AnimatePresence>
		</Layout>
	);
};

export default FavoritesPage;
