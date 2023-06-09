import {
	Icon,
	Stack,
	useDisclosure,
	useMediaQuery,
	useToast,
} from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import type {
	Category,
	Product,
	ProductPriceHistory,
	Quantity,
	Role,
	Size,
	SubCategory,
} from '@prisma/client';
import { motion } from 'framer-motion';
import { useState, type ReactNode, type SyntheticEvent } from 'react';
import { TbShoppingCartPlus } from 'react-icons/tb';
import { useCart } from '~/context/cartContext';
import ProductCardContext from '~/context/productCardContext';
import { api } from '~/utils/api';
import ProductAction from './ProductAction';
import ProductDitails from './ProductDitails';
import ProductFavorites from './ProductFavorites';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import ProductPrice from './ProductPrice';
import ProductSize from './ProductSize';

type ProductProps = {
	image?: ReactNode;
	info?: ReactNode;
	action?: ReactNode;
	favorites?: ReactNode;
	size?: ReactNode;
	product: Product & {
		priceHistory: ProductPriceHistory[];
		quantity: (Quantity & {
			size: Size;
		})[];
		category: Category | null;
		subCategory: SubCategory | null;
	};
	admin?: Role;
	handlEdit?: (
		product: Product & {
			priceHistory: ProductPriceHistory[];
			quantity: (Quantity & {
				size: Size;
			})[];
			category: Category | null;
			subCategory: SubCategory | null;
		}
	) => void;
};

const ProductsCard = ({
	image,
	action,
	info,
	product,
	admin,
	handlEdit,
	favorites,
	size,
}: ProductProps) => {
	const [isTablet] = useMediaQuery(['(max-width: 930px)']);
	const { mutate: archivedProduct, isLoading } =
		api.products.archived.useMutation();
	const ctx = api.useContext();
	const [selectedSize, setSelectedtSize] = useState({
		id: '',
		name: '',
	});
	const { isSignedIn } = useAuth();
	const [error, setError] = useState(false);
	const { cartDispatch } = useCart();
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
			cartDispatch({
				type: 'ADD_TO_CART',
				payload: { ...product, selectedSize },
			});
			setSelectedtSize({
				id: '',
				name: '',
			});
		}
		e.stopPropagation();
	};
	const { isOpen, onClose, onToggle } = useDisclosure();
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
				admin,
				handlAddToCart,
				handleArchivedProduct,
				isLoading,
				selectedSize,
				setSelectedtSize,
				error,
				setError,
			}}
		>
			<Stack
				as={motion.div}
				initial={{ opacity: 0 }}
				animate={{
					opacity: 1,
					transition: { type: 'spring', duration: 1 },
				}}
				exit={{
					opacity: 0,
					transition: { type: 'spring', duration: 0.5 },
				}}
				layout
				maxW={['300px']}
				h={['350px', '450px']}
				direction="column"
				justifyContent="space-between"
				alignItems="center"
				p={[3, 5]}
				border="1px solid #CBD5E0"
				rounded="3xl"
				boxShadow="2xl"
				whileHover={{
					scale: product.archived || isTablet ? 1 : 1.05,
				}}
				cursor="pointer"
				position="relative"
				zIndex={0}
				onClick={() =>
					admin === 'USER'
						? onToggle()
						: product.archived
						? null
						: handlEdit?.(product)
				}
			>
				{isSignedIn ? favorites : null}
				{image}
				{info}
				{admin === 'USER' ? size : null}
				<Stack
					w="100%"
					direction={admin === 'USER' ? 'row' : 'column'}
					alignItems="center"
					justifyContent="space-between"
				>
					{action}
					<ProductPrice />
				</Stack>
				<ProductDitails isOpen={isOpen} onClose={onClose} />
			</Stack>
		</ProductCardContext.Provider>
	);
};

ProductsCard.Favorites = ProductFavorites;
ProductsCard.Image = ProductImage;
ProductsCard.Info = ProductInfo;
ProductsCard.Action = ProductAction;
ProductsCard.Size = ProductSize;

export default ProductsCard;
