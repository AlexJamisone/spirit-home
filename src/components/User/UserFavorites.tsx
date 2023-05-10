import { Stack } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { BsWind } from 'react-icons/bs';
import { api } from '~/utils/api';
import NoData from '../NoData/NoData';
import ProductAction from '../Product/ProductAction';
import ProductsCard from '../Product/ProductCard';
import ProductFavorites from '../Product/ProductFavorites';
import ProductImage from '../Product/ProductImage';
import ProductInfo from '../Product/ProductInfo';

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
								action={<ProductAction />}
								image={<ProductImage />}
								info={<ProductInfo />}
								favorites={<ProductFavorites />}
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
