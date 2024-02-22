import { Link } from '@chakra-ui/next-js';
import { Button, Card, Stack, useBoolean } from '@chakra-ui/react';
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
	isBig: boolean;
};

const ProductsCard = ({ product, role, handlEdit, isBig }: ProductProps) => {
	const [hov, setHov] = useBoolean();
	return (
		<Stack
			as={motion.div}
			layout
			onHoverStart={() => setHov.on()}
			onHoverEnd={() => setHov.off()}
		>
			<Card
				as={role === 'USER' || !role ? Link : undefined}
				href={`/product/${product.id}`}
				onClick={() =>
					role === 'ADMIN' ? handlEdit?.(product) : undefined
				}
				_hover={{
					textDecoration: 'none',
				}}
				maxW={isBig ? 560 : 280}
				h={isBig ? 649 : 361}
				direction="column"
				justifyContent="space-between"
				alignItems="center"
				cursor="pointer"
				position="relative"
				variant="unstyled"
			>
				<ProductFavorites id={product.id} />
				<ProductImagePreview
					image={product.image}
					isBig={isBig}
					onHov={hov}
				/>
				{!hov && (
					<Stack
                        as={motion.div}
                        initial={{opacity: 0}}
                        animate={{opacity: 1, transition: {
                            type: 'spring',
                            duration: 0.7,
                            mass: 0.5
                        }}}
						textAlign="center"
						gap={0}
						position="absolute"
						bottom={0}
						w="100%"
						bg="white"
					>
						<ProductInfo name={product.name} />
						<ProductPrice price={product.price} />
					</Stack>
				)}
				{hov && (
					<Button
						variant="prime"
						w={158}
						fontWeight={400}
						as={motion.button}
						initial={{ opacity: 0, y: 50 }}
						animate={{
							opacity: 1,
							y: 0,
							transition: {
								type: 'spring',
								duration: 0.7,
							},
						}}
						h="32px"
						position="absolute"
						bottom="52px"
					>
						Подробнее
					</Button>
				)}
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
			</Card>
		</Stack>
	);
};

export default ProductsCard;
