import { create } from 'zustand';

type ProducState = {
	size: string;
	error: {
		message: string;
		isError: boolean;
	} | null;
};

type ProductAction = {
	setCler: () => void;
	setError: (error: ProducState['error']) => void;
	setSize: (size: string) => void;
};

type Product = ProducState & ProductAction;

const initial: ProducState = {
	size: '',
	error: null,
};

export const useProductDitails = create<Product>((set) => ({
	...initial,
	setCler: () => set(initial),
	setSize: (size) =>
		set((state) => ({
			size: state.size === size ? '' : size,
		})),
	setError: (error) => set({ error }),
}));
