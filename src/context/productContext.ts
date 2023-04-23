import type { Product,ProductPriceHistory,Role } from '@prisma/client';
import { createContext,useContext,type SyntheticEvent } from 'react';

const ProductCardContext = createContext<{
	product: Product & { priceHistory: ProductPriceHistory[] };
	admin?: Role;
	handlAddToCart?: (e: SyntheticEvent) => void;
	handleArchivedProduct?: (
		id: string,
		name: string,
		e: SyntheticEvent
	) => void;
    isLoading?: boolean
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
