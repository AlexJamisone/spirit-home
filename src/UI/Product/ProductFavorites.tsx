import { Box, Icon, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { TiHeartOutline } from 'react-icons/ti';
import { useProductCardContext } from '~/context/productCardContext';
import { useFavorites } from '~/stores/useFavorites';
const ProductFavorites = () => {
	const { product } = useProductCardContext();
	const { ids, toggle } = useFavorites();
	const toast = useToast();
	return (
		<Box
			as={motion.div}
			whileHover={{ scale: 1.2 }}
			whileTap={{ scale: 0.9, transition: { type: 'spring' } }}
			alignSelf="end"
			onClick={(e) => {
				e.preventDefault();
				toggle(product.id);
			}}
		>
			<Icon
				as={TiHeartOutline}
				boxSize={6}
				color={ids.includes(product.id) ? 'red.400' : 'second'}
				transition="color .3s linear"
			/>
		</Box>
	);
};

export default ProductFavorites;
