import { Stack, Text } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useProductContext } from '~/context/productContext';

const ProductDescription = () => {
	const {
		product: { description },
	} = useProductContext();
	return (
		<AnimatePresence>
			<Stack
				as={motion.div}
				layout
				maxW="300px"
				gap={5}
				textAlign="center"
				textColor="blackAlpha.600"
			>
				{description.map((dsk, index) => (
					<Text key={index}>{dsk}</Text>
				))}
			</Stack>
		</AnimatePresence>
	);
};

export default ProductDescription;
