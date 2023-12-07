import { Stack, Text } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useProduct } from '~/hooks/useProduct';

const ProductDescription = () => {
	const { product } = useProduct();
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
				{product?.description.map((dsk, index) => (
					<Text key={index}>{dsk}</Text>
				))}
			</Stack>
		</AnimatePresence>
	);
};

export default ProductDescription;
