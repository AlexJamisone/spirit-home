import { Link } from '@chakra-ui/next-js';
import { Card, CardFooter, Stack } from '@chakra-ui/react';
import type {
	Category,
	Product,
	Role,
	Size,
	SubCategory,
} from '@prisma/client';
import { motion } from 'framer-motion';
import ProductAction from './ProductAction';
import ProductFavorites from './ProductFavorites';
import ProductImagePreview from './ProductImagePreview';
import ProductInfo from './ProductInfo';
import ProductPrice from './ProductPrice';
import ProductTag from './ProductTag';

type ProductProps = {
	product: Product & {
		size: Size[];
		category: Category | null;
		subCategory: SubCategory | null;
	};
	role?: Role;
	handlEdit?: (
		product: Product & {
			size: Size[];
			category: Category | null;
			subCategory: SubCategory | null;
		}
	) => void;
};

const ProductsCard = ({ product, role, handlEdit }: ProductProps) => {
	return (
		<Stack as={motion.div} layout>
			<Card
				boxShadow="base"
				gap={1}
				as={role === 'USER' || !role ? Link : undefined}
				href={`/product/${product.id}`}
				onClick={() =>
					role === 'ADMIN' ? handlEdit?.(product) : undefined
				}
				_hover={{
					textDecoration: 'none',
				}}
				maxW={['300px']}
				h={['350px', '450px']}
				direction="column"
				justifyContent="space-between"
				alignItems="center"
				p={[3, 5]}
				border="1px solid"
				borderColor="second"
				rounded="41px"
				cursor="pointer"
				position="relative"
				zIndex={0}
				size={{
					xl: 'sm',
					'2xl': 'lg',
				}}
			>
				<ProductFavorites id={product.id} />
				<ProductImagePreview image={product.image} />
				<ProductInfo name={product.name} />
				{role === 'ADMIN' && (
					<>
						<ProductTag
							category={
								product.subCategoryTitle ||
								product.categoryTitle
							}
						/>
						<ProductAction
							archived={product.archived}
							id={product.id}
						/>
					</>
				)}
				<CardFooter>
					<ProductPrice price={product.price} />
				</CardFooter>
			</Card>
		</Stack>
	);
};

export default ProductsCard;
