import { create } from 'zustand';
import type { ZodError } from './types';

type CategoryState = {
	category: {
		input: {
			title: string;
			path: string;
		};
		edit: {
			isEdit: boolean;
			isSelected: boolean;
			categoryId: string;
		};
		error?: {
			isError: boolean;
			msg: ZodError;
		};
	};
	subCategory: {
		input: {
			title: string;
			path: string;
		};
		edit: {
			isEdit: boolean;
			subCategoryId: string;
		};
		error?: {
			isError: boolean;
			msg: ZodError;
		};
	};
};

export type CategoryInputValue = CategoryState['category']['input'];
export type SubCategoryInputValue = CategoryState['subCategory']['input'];

type CategoryAction = {
	setCategoryInput: (input: CategoryInputValue) => void;
	setSubCategoryInput: (input: SubCategoryInputValue) => void;

	setCategoryEdit: (edit: CategoryState['category']['edit']) => void;
	setSubCategoryEdit: (edit: CategoryState['subCategory']['edit']) => void;

	setCategoryError: (erro: CategoryState['category']['error']) => void;
	setSubCategoryError: (erro: CategoryState['subCategory']['error']) => void;

	setClear: () => void;
	resetCategory: () => void;
	resetSubCategory: () => void;
};

type Category = CategoryState & CategoryAction;

const initial: CategoryState = {
	category: {
		edit: {
			categoryId: '',
			isEdit: false,
			isSelected: false,
		},
		input: {
			path: '',
			title: '',
		},
	},
	subCategory: {
		edit: {
			isEdit: false,
			subCategoryId: '',
		},
		input: {
			path: '',
			title: '',
		},
	},
};

export const useCategory = create<Category>((set) => ({
	...initial,
	setCategoryInput: (input) =>
		set((state) => ({
			category: {
				...state.category,
				input: { ...state.category.input, ...input },
			},
		})),
	setSubCategoryInput: (input) =>
		set((state) => ({
			subCategory: {
				...state.subCategory,
				input: { ...state.subCategory.input, ...input },
			},
		})),
	setCategoryEdit: (edit) =>
		set((state) => ({
			category: { ...state.category, edit },
		})),
	setSubCategoryEdit: (edit) =>
		set((state) => ({
			subCategory: { ...state.subCategory, edit },
		})),
	setCategoryError: (error) =>
		set((state) => ({ category: { ...state.category, error } })),
	setSubCategoryError: (error) =>
		set((state) => ({ subCategory: { ...state.subCategory, error } })),
	setClear: () => set(initial),
	resetCategory: () =>
		set((state) => ({ category: { ...state.category, error: undefined } })),
	resetSubCategory: () =>
		set((state) => ({
			subCategory: { ...state.subCategory, error: undefined },
		})),
}));
