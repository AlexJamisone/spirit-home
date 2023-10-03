import { createContext, useContext, useReducer, type Dispatch } from 'react';
import {
	favoritesReducer,
	initial,
	type Action,
	type FavoritesState,
} from '~/reducer/FavoritesReducer';

type FavoritesContextType = {
	favoritesState: FavoritesState;
	favDispatch: Dispatch<Action>;
};

const FavoritesContext = createContext<FavoritesContextType>({
	favoritesState: initial,
	favDispatch: () => null,
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [favoritesState, favDispatch] = useReducer(favoritesReducer, initial);

	return (
		<FavoritesContext.Provider value={{ favoritesState, favDispatch }}>
			{children}
		</FavoritesContext.Provider>
	);
};
