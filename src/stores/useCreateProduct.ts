import { create } from 'zustand';
import type { ZodError } from './types';

type CreateProductState = {
	id: string;
	input: {
		name: string;
		description: string;
		price: number;
	};
	size: string[];
	image: string[];
	category: {
		id: string;
		title: string;
		sub: boolean;
	};
	isEdit: boolean;
	error?: {
		isError: boolean;
		msg: ZodError;
	};
};

export type CreateProductInput = CreateProductState['input'];

type CreateProductAction = {
	setInput: (input: CreateProductInput) => void;
	setSize: (size: string) => void;
	setImage: (image: string) => void;
	setCategory: (categoty: CreateProductState['category']) => void;
	setEdit: (isEdit: boolean) => void;
	setError: (error: CreateProductState['error']) => void;
	removeImag: (id: string) => void;
	setAll: (product: CreateProductState) => void;
	setClear: () => void;
	reset: () => void;
};

type CreateProduct = CreateProductState & CreateProductAction;
const initial: CreateProductState = {
	id: '',
	input: {
		description: '',
		name: '',
		price: 0,
	},
	size: [],
	image: [],
	category: {
		id: '',
		sub: false,
		title: '',
	},
	isEdit: false,
};

export const useCreateProduct = create<CreateProduct>((set) => ({
	...initial,
	setInput: (input) =>
		set((state) => ({ input: { ...state.input, ...input } })),
	setSize: (size) =>
		set((state) => {
			const idx = state.size.findIndex((value) => value === size);
			if (idx === -1) {
				return {
					size: [...state.size, size],
				};
			} else {
				const filtred = state.size.filter((value) => value !== size);
				return {
					size: [...filtred],
				};
			}
		}),
	setImage: (image) => set((state) => ({ image: [...state.image, image] })),
	removeImag: (id) =>
		set((state) => ({
			image: state.image.filter((imgId) => imgId !== id),
		})),
	setCategory: (category) =>
		set((state) => ({ category: { ...state.category, ...category } })),
	setEdit: (isEdit) => set({ isEdit }),
	setError: (error) => set({ error }),
	reset: () => set({ error: undefined }),
	setClear: () => set(initial),
	setAll: (product) =>
		set((state) => {
			const { category, id, image, input, isEdit, size } = product;
			return {
				...state,
				category,
				id,
				image,
				input,
				isEdit,
				size,
				error: undefined,
			};
		}),
}));
