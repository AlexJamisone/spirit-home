import { Stack, Text } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { api } from '~/utils/api';

const ProductDescription = () => {
	const ctx = api.useContext();
	const data = ctx.products.getSinglProduct.getData();
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
				{data?.description.map((dsk, index) => (
					<Text key={index}>{dsk}</Text>
				))}
			</Stack>
		</AnimatePresence>
	);
};

export default ProductDescription;
