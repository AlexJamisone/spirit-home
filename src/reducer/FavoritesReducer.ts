export type FavoritesState = string[];

interface SetAddToFav {
	type: 'TOGLLE_FAV';
	payload: string;
}

export type Action = SetAddToFav;

const FAV_STORAGE_KEY = 'favorites';
const getFromLocal = (): FavoritesState | null => {
	if (typeof window !== 'undefined' && window.localStorage) {
		const favoritesJSON = window.localStorage.getItem(FAV_STORAGE_KEY);
		if (favoritesJSON) {
			return JSON.parse(favoritesJSON) as FavoritesState;
		}
	}
	return null;
};

const saveToLocal = (favorites: FavoritesState) => {
	if (typeof window !== 'undefined' && window.localStorage) {
		window.localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favorites));
	}
};

export const initial: FavoritesState = getFromLocal() || [];

export function favoritesReducer(
	state: FavoritesState = initial,
	action: Action
): FavoritesState {
	switch (action.type) {
		case 'TOGLLE_FAV': {
			const index = state.indexOf(action.payload);
			if (index !== -1) {
				const newState = [
					...state.slice(0, index),
					...state.slice(index + 1),
				];
				saveToLocal(newState);
				return newState;
			} else {
				const newState = [...state, action.payload];
				saveToLocal(newState);
				return newState;
			}
		}
		default:
			return state;
	}
}
