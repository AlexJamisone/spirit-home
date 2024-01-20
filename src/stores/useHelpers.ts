import { create } from 'zustand';
type HelperState = {
	product: {
		ids: string[];
	};
};
type HelperAction = {
	setId: (id: string) => void;
};
type Helper = HelperState & HelperAction;
const initial: HelperState = {
	product: {
		ids: [],
	},
};
export const useHelper = create<Helper>((set) => ({
	...initial,
	setId: (id) =>
		set((state) => ({
			...state,
			product: {
                ids: state.product.ids.includes(id) ? state.product.ids.filter((i) => i !== id) : [...state.product.ids, id]
			},
		})),
}));
