import { Box, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { TiHeartOutline } from 'react-icons/ti';
import { useFavorites } from '~/stores/useFavorites';
const ProductFavorites = ({ id }: { id: string }) => {
	const ids = useFavorites((state) => state.ids);
	const toggle = useFavorites((state) => state.toggle);
	return (
		<Box
			as={motion.div}
			whileHover={{ scale: 1.2 }}
			whileTap={{ scale: 0.9, transition: { type: 'spring' } }}
			alignSelf="end"
			onClick={(e) => {
				e.preventDefault();
				toggle(id);
			}}
		>
			<Icon
				as={TiHeartOutline}
				boxSize={6}
				color={ids.includes(id) ? 'red.400' : 'second'}
				transition="color .3s linear"
			/>
		</Box>
	);
};

export default ProductFavorites;
