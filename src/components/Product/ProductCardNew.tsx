import { Stack, useToast } from '@chakra-ui/react';
import type { Product, ProductPriceHistory, Role } from '@prisma/client';
import type { ReactNode, SyntheticEvent } from 'react';
import { useCart } from '~/context/cartContext';
import ProductCardContext from '~/context/productContext';
import { api } from '~/utils/api';

type ProductProps = {
	image?: ReactNode;
	info?: ReactNode;
	action?: ReactNode;
	product: Product & {
		priceHistory: ProductPriceHistory[];
	};
	admin?: Role;
	handlEdit?: (
		product: Product & {
			priceHistory: ProductPriceHistory[];
		}
	) => void;
};

const ProductsCardNew = ({
	image,
	action,
	info,
	product,
	admin,
	handlEdit,
}: ProductProps) => {
	const { mutate: archivedProduct, isLoading } =
		api.products.archived.useMutation();
	const ctx = api.useContext();
	const { cartDispatch } = useCart();
	const toast = useToast();
	const handlAddToCart = (e: SyntheticEvent) => {
		cartDispatch({ type: 'ADD_TO_CART', payload: product });
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
						description: product.archived
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
			value={{ product, admin, handlAddToCart, handleArchivedProduct }}
		>
			<Stack
				maxW={['300px']}
				h={['350px']}
				direction="column"
				justifyContent="center"
				alignItems="center"
				p={5}
				border="1px solid #CBD5E0"
				rounded="3xl"
				boxShadow="2xl"
				_hover={{
					transform: `${product.archived ? 'none' : 'scale(1.1)'}`,
				}}
				cursor="pointer"
				transition="all 0.2s ease-in-out"
				position="relative"
				zIndex={-0}
				onClick={() =>
					admin === undefined || admin === 'USER'
						? null
						: product.archived
						? null
						: handlEdit?.(product)
				}
			>
				{image}
				{info}
				{action}
			</Stack>
		</ProductCardContext.Provider>
	);
};

export default ProductsCardNew;
