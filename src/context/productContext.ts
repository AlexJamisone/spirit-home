import type { Product, Size } from '@prisma/client';
import { createContext, useContext, type Dispatch } from 'react';
import type {
	Action,
	ProductDitailState,
} from '~/reducer/ProductDitailsReducer';

const ProductContext = createContext<{
	product: Product & {
		size: Size[];
	};
	productDitalState: ProductDitailState;
	prodAction: Dispatch<Action>;
} | null>(null);

export function useProductContext() {
	const context = useContext(ProductContext);
	if (!context)
		throw new Error(
			'ProductCard.* component must be render as a child of ProductCard comopnent'
		);
	return context;
}

export default ProductContext;
