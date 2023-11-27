import { Link } from '@chakra-ui/next-js';
import { Card, CardFooter, Stack, useToast } from '@chakra-ui/react';
import type {
	Category,
	Product,
	Role,
	Size,
	SubCategory,
} from '@prisma/client';
import { motion } from 'framer-motion';
import { useState, type ReactNode, type SyntheticEvent } from 'react';
import ProductCardContext from '~/context/productCardContext';
import { api } from '~/utils/api';
import ProductAction from './ProductAction';
import ProductCategory from './ProductCategory';
import ProductFavorites from './ProductFavorites';
import ProductImagePreview from './ProductImagePreview';
import ProductInfo from './ProductInfo';
import ProductPrice from './ProductPrice';

type ProductProps = {
	image?: ReactNode;
	info?: ReactNode;
	favorites?: ReactNode;
	tag?: ReactNode;
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

const ProductsCard = ({
	image,
	info,
	product,
	role,
	handlEdit,
	favorites,
	tag,
}: ProductProps) => {
	const { mutate: archivedProduct, isLoading } =
		api.products.archived.useMutation();

	const ctx = api.useContext();

	const [error, setError] = useState(false);
	const toast = useToast();
	const handleArchivedProduct = (
		id: string,
		name: string,
		e: SyntheticEvent
	) => {
		archivedProduct(
			{
				id,
				action: !product.archived,
			},
			{
				onSuccess: () => {
					toast({
						description: !product.archived
							? `Товар ${name} успешно архивирован!🚀`
							: `Товар ${name} успешно восстоновлен!🎉`,
						status: product.archived ? 'info' : 'success',
						isClosable: true,
					});
					void ctx.products.invalidate();
				},
				onError: () => {
					toast({
						description: `Ошбка с удалением ❌`,
						status: 'error',
						isClosable: true,
					});
				},
			}
		);
		e.stopPropagation();
	};
	return (
		<ProductCardContext.Provider
			value={{
				product,
				role,
				handleArchivedProduct,
				isLoading,
				error,
				setError,
			}}
		>
			<Stack as={motion.div} layout>
				<Card
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
					{favorites}
					{image}
					{info}
					{role === 'ADMIN' && tag}
					<CardFooter>
						<ProductPrice />
					</CardFooter>
				</Card>
			</Stack>
		</ProductCardContext.Provider>
	);
};

ProductsCard.Favorites = ProductFavorites;
ProductsCard.Image = ProductImagePreview;
ProductsCard.Info = ProductInfo;
ProductsCard.Action = ProductAction;
ProductsCard.Tag = ProductCategory;

export default ProductsCard;
