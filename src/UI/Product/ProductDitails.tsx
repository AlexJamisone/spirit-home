import {
	Grid,
	GridItem,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useProductCardContext } from '~/context/productCardContext';
import ProductAction from './ProductAction';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import ProductPrice from './ProductPrice';
import ProductSize from './ProductSize';

type ProductDitailsProps = {
	isOpen: boolean;
	onClose: () => void;
};

const ProductDitails = ({ isOpen, onClose }: ProductDitailsProps) => {
	const { product } = useProductCardContext();
	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size={['xs', 'lg']}
				isCentered
			>
				<ModalOverlay />
				<ModalContent
					as={motion.div}
					initial={{ opacity: 0, y: 50, x: -50 }}
					animate={{
						opacity: 1,
						y: 0,
						x: 0,
						transition: { type: 'spring', duration: 0.5 },
					}}
				>
					<ModalHeader textAlign="center">{product.name}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Grid
							templateColumns={[
								'repeat(1, 1fr)',
								'repeat(2, 1fr)',
							]}
							gap={[2, 3]}
							justifyContent="center"
						>
							<GridItem h="100%" position="relative">
								<ProductImage
									container={{
										zIndex: 10,
									}}
									zoom={true}
								/>
							</GridItem>
							<GridItem colStart={[1, 2]}>
								<Text
									textAlign="center"
									mb={5}
									fontWeight={600}
								>
									Размеры
								</Text>
								<ProductSize />
							</GridItem>
							<GridItem colStart={[1, 2]} textAlign="center">
								<ProductPrice />
							</GridItem>
							<GridItem colStart={[1, 2]}>
								<ProductAction
									container={{
										w: '100%',
									}}
								/>
							</GridItem>
							<GridItem colSpan={2} textAlign="center">
								<ProductInfo full={true} />
							</GridItem>
						</Grid>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ProductDitails;
