import { Stack } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { BsWind } from 'react-icons/bs';
import { api } from '~/utils/api';
import NoData from '../NoData/NoData';
import ProductsCard from '../Product/ProductCard';

const UserFavorites = () => {
	const { data: user } = api.users.getUserForFavProduct.useQuery();
	if (!user) return null;
	return (
		<Stack direction="row" flexWrap="wrap" gap={5}>
			{user.favorites.length === 0 ? (
				<NoData icon={BsWind} text="В избранном пусто" />
			) : (
				<>
					<AnimatePresence>
						{user.favorites?.map(({ product }) => (
							<ProductsCard
								key={product.id}
								product={product}
								action={<ProductsCard.Action />}
								image={<ProductsCard.Image />}
								info={<ProductsCard.Info />}
								favorites={<ProductsCard.Favorites />}
								admin="USER"
							/>
						))}
					</AnimatePresence>
				</>
			)}
		</Stack>
	);
};

export default UserFavorites;
