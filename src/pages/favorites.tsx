import { AnimatePresence } from 'framer-motion';
import { TiHeartOutline } from 'react-icons/ti';
import ProductsCard from '~/UI/Product/ProductCard';
import Layout from '~/components/Layout';
import NoData from '~/components/NoData/NoData';
import { useFavorites } from '~/context/favoritesContext';
import { api } from '~/utils/api';

const FavoritesPage = () => {
	const { favoritesState } = useFavorites();
	const { data: products } = api.products.getByFavorites.useQuery({
		id: favoritesState,
	});
	if (!products || favoritesState.length === 0)
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
						key={product.id}
						product={product}
						favorites={<ProductsCard.Favorites />}
						image={<ProductsCard.Image />}
						role="USER"
						info={<ProductsCard.Info />}
					/>
				))}
			</AnimatePresence>
		</Layout>
	);
};

export default FavoritesPage;
