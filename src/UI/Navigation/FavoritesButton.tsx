import { Link } from '@chakra-ui/next-js';
import { Icon, IconButton, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { TiHeartOutline } from 'react-icons/ti';
import ButtonsGroup from '~/components/ButtonsGroup';
import Counter from '~/components/Counter';
import { useFavorites } from '~/context/favoritesContext';

const FavoritesButton = () => {
	const { favoritesState } = useFavorites();
	if (favoritesState.length === 0) return null;
	return (
		<Stack
			as={motion.div}
			initial={{ opacity: 0, y: 50 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: {
					type: 'spring',
					duration: 0.3,
				},
			}}
			exit={{
				opacity: 0,
				transition: {
					type: 'spring',
					duration: 3,
				},
			}}
		>
			<ButtonsGroup>
				<Counter length={favoritesState.length} />
				<IconButton
					aria-label="favorites"
					icon={
						<Icon as={TiHeartOutline} color="second" boxSize={6} />
					}
					variant="outline"
					as={Link}
					href={`/favorites`}
					borderColor="second"
					position="relative"
				/>
			</ButtonsGroup>
		</Stack>
	);
};

export default FavoritesButton;
