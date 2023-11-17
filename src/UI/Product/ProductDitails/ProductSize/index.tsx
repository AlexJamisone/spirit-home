import { Stack, Text } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useProductContext } from '~/context/productContext';
import ProductSizeBtn from './ProductSizeBtn';

const ProductSize = () => {
	const {
		product: { size },
		productDitalState,
	} = useProductContext();
	return (
		<Stack>
			<Text fontWeight={600} textAlign="center">
				Размеры
			</Text>
			<Stack
				direction="row"
				flexWrap="wrap"
				maxW={300}
				justifyContent="center"
			>
				{size.map((sz) => (
					<ProductSizeBtn size={sz} key={sz.id} />
				))}
			</Stack>
			<AnimatePresence>
				{productDitalState.error?.isError && (
					<Text
						as={motion.p}
						initial={{
							opacity: 0,
							y: -50,
						}}
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
								duration: 0.3,
								type: 'spring',
							},
						}}
						textColor="orange.300"
						fontWeight={600}
						textAlign="center"
					>
						{productDitalState.error?.message}
					</Text>
				)}
			</AnimatePresence>
		</Stack>
	);
};

export default ProductSize;
