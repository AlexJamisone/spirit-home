import { Box, Icon, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { TiHeartOutline } from 'react-icons/ti';
import { useFavorites } from '~/context/favoritesContext';
import { useProductCardContext } from '~/context/productCardContext';
const ProductFavorites = () => {
	const { product } = useProductCardContext();
	const { favoritesState, favDispatch } = useFavorites();
	const toast = useToast();
	return (
		<Box
			as={motion.div}
			whileHover={{ scale: 1.2 }}
			whileTap={{ scale: 0.9, transition: { type: 'spring' } }}
			alignSelf="end"
			onClick={(e) => {
				e.preventDefault();
				favDispatch({ type: 'TOGLLE_FAV', payload: product.id });
			}}
		>
			<Icon
				as={TiHeartOutline}
				boxSize={6}
				color={
					favoritesState.includes(product.id) ? 'red.400' : 'second'
				}
				transition="color .3s linear"
			/>
		</Box>
	);
};

export default ProductFavorites;
