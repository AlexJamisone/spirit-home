import { Link } from '@chakra-ui/next-js';
import { Card, CardFooter, Icon, useToast } from '@chakra-ui/react';
import type { Category, Product, Role, SubCategory } from '@prisma/client';
import { useState, type ReactNode, type SyntheticEvent } from 'react';
import { TbShoppingCartPlus } from 'react-icons/tb';
import ProductCardContext from '~/context/productCardContext';
import { api } from '~/utils/api';
import ProductAction from './ProductAction';
import ProductFavorites from './ProductFavorites';
import ProductImagePreview from './ProductImagePreview';
import ProductInfo from './ProductInfo';
import ProductPrice from './ProductPrice';
import ProductSize from './ProductSize';

type ProductProps = {
	image?: ReactNode;
	info?: ReactNode;
	favorites?: ReactNode;
	product: Product & {
		category: Category | null;
		subCategory: SubCategory | null;
	};
	role?: Role;
	handlEdit?: (
		product: Product & {
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
}: ProductProps) => {
	const { mutate: archivedProduct, isLoading } =
		api.products.archived.useMutation();

	const ctx = api.useContext();
	const [selectedSize, setSelectedtSize] = useState({
		id: '',
		name: '',
	});

	const [error, setError] = useState(false);
	const toast = useToast();
	const handlAddToCart = (e: SyntheticEvent) => {
		if (!selectedSize.id || !selectedSize.name) {
			setError(true);
			toast({
				description: 'Выбери пожалуйста размер',
				status: 'warning',
				isClosable: true,
			});
		} else {
			toast({
				description: 'Товар добавлен в корзину!',
				status: 'info',
				icon: (
					<Icon
						as={TbShoppingCartPlus}
						boxSize={6}
						textAlign="center"
					/>
				),
				isClosable: true,
				duration: 2000,
			});
		}
		e.stopPropagation();
	};
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
				handlAddToCart,
				handleArchivedProduct,
				isLoading,
				selectedSize,
				setSelectedtSize,
				error,
				setError,
			}}
		>
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
				<CardFooter>
					<ProductPrice />
				</CardFooter>
			</Card>
		</ProductCardContext.Provider>
	);
};

ProductsCard.Favorites = ProductFavorites;
ProductsCard.Image = ProductImagePreview;
ProductsCard.Info = ProductInfo;
ProductsCard.Action = ProductAction;
ProductsCard.Size = ProductSize;

export default ProductsCard;
