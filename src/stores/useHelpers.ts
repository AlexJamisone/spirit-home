import { create } from 'zustand';
type HelperState = {
	product: {
		ids: string[];
	};
	categotys: {
		ids: string[];
	};
};
type HelperAction = {
	setId: (id: string) => void;
	setCatId: (id: string) => void;
	setClear: () => void;
};
type Helper = HelperState & HelperAction;
const initial: HelperState = {
	product: {
		ids: [],
	},
	categotys: {
		ids: [],
	},
};
export const useHelper = create<Helper>((set) => ({
	...initial,
	setId: (id) =>
		set((state) => ({
			...state,
			product: {
				ids: state.product.ids.includes(id)
					? state.product.ids.filter((i) => i !== id)
					: [...state.product.ids, id],
			},
		})),
	setCatId: (id) =>
		set((state) => ({
			...state,
			categotys: {
				ids: state.categotys.ids.includes(id)
					? state.categotys.ids.filter((i) => i !== id)
					: [...state.categotys.ids, id],
			},
		})),
	setClear: () => set(initial),
}));
