import { create } from 'zustand';

type SerachState = {
	query: string;
	animationPlaceholder: boolean;
};

type SerachAction = {
	setSearch: (query: string) => void;
	setAnimationPlaceholder: (psl: boolean) => void;
};

type Search = SerachState & SerachAction;

export const useSearch = create<Search>((set) => ({
	query: '',
	animationPlaceholder: true,
	setAnimationPlaceholder: (animationPlaceholder) =>
		set({ animationPlaceholder }),
	setSearch: (query) => set({ query }),
}));
