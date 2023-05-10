import type {
	Product,
	ProductPriceHistory,
	Quantity,
	Role,
	Size,
} from '@prisma/client';
import {
	createContext,
	useContext,
	type Dispatch,
	type SetStateAction,
	type SyntheticEvent,
} from 'react';

const ProductCardContext = createContext<{
	product: Product & {
		priceHistory: ProductPriceHistory[];
		quantity: (Quantity & {
			size: Size;
		})[];
	};
	admin?: Role;
	selectedSize: { id: string; name: string };
	setSelectedtSize: Dispatch<SetStateAction<{ id: string; name: string }>>;
	error: boolean;
	setError: Dispatch<SetStateAction<boolean>>;
	handlAddToCart?: (e: SyntheticEvent) => void;
	handleArchivedProduct?: (
		id: string,
		name: string,
		e: SyntheticEvent
	) => void;
	isLoading?: boolean;
} | null>(null);

export function useProductCardContext() {
	const context = useContext(ProductCardContext);
	if (!context)
		throw new Error(
			'ProductCard.* component must be render as a child of ProductCard comopnent'
		);
	return context;
}

export default ProductCardContext;
