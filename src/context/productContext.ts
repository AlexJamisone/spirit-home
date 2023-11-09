import type { Category, Product, Size, SubCategory } from '@prisma/client';
import { createContext, useContext } from 'react';

const ProductCardContext = createContext<{
	product: Product & {
		size: Size[];
		category: Category;
		subCategory: SubCategory;
	};
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
