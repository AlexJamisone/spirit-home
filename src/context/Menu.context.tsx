import { createContext, useReducer, useContext } from 'react';
import {
	MenuReducer,
	initial_state,
	type Action,
	type MenuState,
} from '~/reducers/Menu.reducer';

interface MenuContextProps {
	menuState: MenuState;
	dispatchMenu: React.Dispatch<Action>;
}

const MenuContext = createContext<MenuContextProps>({
	menuState: initial_state,
	dispatchMenu: () => null,
});

export const useMenuContext = () => useContext(MenuContext);

export const MenuContextProdiver = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [menuState, dispatchMenu] = useReducer(MenuReducer, initial_state);
	return (
		<MenuContext.Provider value={{ menuState, dispatchMenu }}>
			{children}
		</MenuContext.Provider>
	);
};
