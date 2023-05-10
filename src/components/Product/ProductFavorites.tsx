import { Box, Icon, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { SyntheticEvent } from 'react';
import { TiHeartOutline } from 'react-icons/ti';
import { useProductCardContext } from '~/context/productCardContext';
import { api } from '~/utils/api';
const ProductFavorites = () => {
	const { data: user } = api.users.getUserForFav.useQuery();
	const { mutate: removeOrAdd } =
		api.favorites.handlAddOrRemoveFav.useMutation();
	const { product } = useProductCardContext();
	const toast = useToast();
	const ctx = api.useContext();

	if (!user) return null;

	const handlFavorites = (e: SyntheticEvent) => {
		removeOrAdd(
			{ id: product.id },
			{
				onSuccess: () => {
					toast({
						description: 'Успешно',
						status: 'info',
						isClosable: true,
						position: 'top-right',
					});
					void ctx.users.getUserForFav.invalidate();
					void ctx.users.getUserForFavProduct.invalidate();
				},
			}
		);
		e.stopPropagation();
	};

	return (
		<Box
			as={motion.div}
			whileHover={{ scale: 1.2 }}
			whileTap={{ scale: 0.9, transition: { type: 'spring' } }}
			position="absolute"
			top={5}
			right={5}
			zIndex={10}
			h="24px"
			onClick={handlFavorites}
		>
			<Icon
				as={TiHeartOutline}
				boxSize={6}
				color={
					user.favorites?.some(
						({ productId }) => productId === product.id
					)
						? 'red.300'
						: 'gray.600'
				}
				transition="color .3s linear"
			/>
		</Box>
	);
};

export default ProductFavorites;
