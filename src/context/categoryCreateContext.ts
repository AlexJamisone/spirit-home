import type { Category, SubCategory } from '@prisma/client';
import { createContext, useContext, type Dispatch } from 'react';
import type {
	Action,
	AdminCategoryState,
} from '~/reducer/AdminCategoryReducer';

export interface CreateCategoryContext {
	categorys:
		| (Category & {
				subCategory: SubCategory[];
		  })[]
		| undefined;
	cat: AdminCategoryState;
	dispatch: Dispatch<Action>;
	handleEdit: (id: string, title: string, path: string) => void;
}

const CategoryContext = createContext<CreateCategoryContext | null>(null);

export function useCreateCategoryContext() {
	const context = useContext(CategoryContext);
	if (!context)
		throw new Error(
			'CreateCategory.* component must be render as a child of CreateCategory comopnent'
		);
	return context;
}

export default CategoryContext;
