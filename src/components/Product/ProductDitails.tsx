import { Center } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useProductCardContext } from '~/context/productCardContext';
import ProductAction from './ProductAction';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import ProductPrice from './ProductPrice';

type ProductDitailsProps = {
	isOpen: boolean;
	onClose: () => void;
};

const ProductDitails = ({ isOpen, onClose }: ProductDitailsProps) => {
	const { product } = useProductCardContext();
	return (
		<>
			{isOpen ? (
				<AnimatePresence>
					<Center as={motion.div} layoutId={product.id}>
						<ProductImage />
						<ProductInfo />
						<ProductPrice />
						<ProductAction />
					</Center>
				</AnimatePresence>
			) : null}
		</>
	);
};

export default ProductDitails;
