import type { Product, Role } from '@prisma/client';
import {
	createContext,
	useContext,
	type Dispatch,
	type SetStateAction,
	type SyntheticEvent,
} from 'react';

const ProductCardContext = createContext<{
	product: Product;
	role?: Role;
	error: boolean;
	setError: Dispatch<SetStateAction<boolean>>;
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
