import {
	Stack,
	useDisclosure,
	useMediaQuery,
	useToast,
} from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import type {
	Product,
	ProductPriceHistory,
	Quantity,
	Role,
	Size,
} from '@prisma/client';
import { motion } from 'framer-motion';
import { useState, type ReactNode, type SyntheticEvent } from 'react';
import { useCart } from '~/context/cartContext';
import ProductCardContext from '~/context/productCardContext';
import { api } from '~/utils/api';
import ProductDitails from './ProductDitails';
import ProductPrice from './ProductPrice';
import ProductSize from './ProductSize';

type ProductProps = {
	image?: ReactNode;
	info?: ReactNode;
	action?: ReactNode;
	favorites?: ReactNode;
	product: Product & {
		priceHistory: ProductPriceHistory[];
		quantity: (Quantity & {
			size: Size;
		})[];
	};
	admin?: Role;
	handlEdit?: (
		product: Product & {
			priceHistory: ProductPriceHistory[];
			quantity: (Quantity & {
				size: Size;
			})[];
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
				h={['350px', '425px']}
				direction="column"
				justifyContent="center"
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
				{admin === 'USER' ? <ProductSize /> : null}
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

export default ProductsCard;
