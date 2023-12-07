import { Stack, Text } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useProduct } from '~/stores/useProduct';
import { api } from '~/utils/api';
import ProductSizeBtn from './ProductSizeBtn';

const ProductSize = () => {
	const ctx = api.useContext();
	const data = ctx.products.getSinglProduct.getData();
	const error = useProduct((state) => state.error);
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
				{data?.size.map((sz) => (
					<ProductSizeBtn size={sz} key={sz.id} />
				))}
			</Stack>
			<AnimatePresence>
				{error?.isError && (
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
						{error?.message}
					</Text>
				)}
			</AnimatePresence>
		</Stack>
	);
};

export default ProductSize;
