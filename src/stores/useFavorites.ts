import { create } from 'zustand';
import {
	getFromLocalStorage,
	saveToLocalStorage,
} from '~/helpers/localStorage';
type FavoritesState = {
	ids: string[];
};
type FavoritesAction = {
	toggle: (id: string) => void;
};
type Favorites = FavoritesState & FavoritesAction;

const FAV_STORAGE_KEY = 'favorites';
const initial: FavoritesState = getFromLocalStorage(FAV_STORAGE_KEY) || {
	ids: [],
};

export const useFavorites = create<Favorites>((set) => ({
	...initial,
	toggle: (id) =>
		set((state) => {
			const idx = state.ids.indexOf(id);
			if (idx !== -1) {
				const newState: FavoritesState = {
					ids: [
						...state.ids.slice(0, idx),
						...state.ids.slice(idx + 1),
					],
				};
				saveToLocalStorage(newState, FAV_STORAGE_KEY);
				return {
					...state,
					...newState,
				};
			} else {
				const newState: FavoritesState = {
					ids: [...state.ids, id],
				};
				saveToLocalStorage(newState, FAV_STORAGE_KEY);
				return {
					...state,
					...newState,
				};
			}
		}),
}));
