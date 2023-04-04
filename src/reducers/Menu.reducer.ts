export type MenuState = {
	home: boolean;
	orders: boolean;
	cart: boolean;
	favorites: boolean;
	settings: boolean;
};

export interface SetHomeAction {
	// type: 'SET_HOME';
    type: string
	payload: boolean;
}
export interface SetOrdersAction {
	// type: 'SET_ORDERS';
    type: string
	payload: boolean;
}
export interface SetCartAction {
	// type: 'SET_CART';
    type: string
	payload: boolean;
}
export interface SetFavoritesAction {
	// type: 'SET_FAVORITES';
    type: string
	payload: boolean;
}
export interface SetSettingsAction {
	// type: 'SET_SETTINGS';
    type: string
	payload: boolean;
}

type Action =
	| SetCartAction
	| SetHomeAction
	| SetOrdersAction
	| SetFavoritesAction
	| SetSettingsAction;

export const MenuReducer = (state: MenuState, action: Action): MenuState => {
	switch (action.type) {
		case 'SET_HOME':
			return {
				home: action.payload,
				cart: false,
				favorites: false,
				orders: false,
				settings: false,
			};
		case 'SET_ORDERS':
			return {
				orders: action.payload,
				cart: false,
				favorites: false,
				settings: false,
				home: false,
			};
		case 'SET_CART':
			return {
				cart: action.payload,
				favorites: false,
				orders: false,
				settings: false,
				home: false,
			};
		case 'SET_FAVORITES':
			return {
				favorites: action.payload,
				cart: false,
				orders: false,
				settings: false,
				home: false,
			};
		case 'SET_SETTINGS':
			return {
				settings: action.payload,
				cart: false,
				favorites: false,
				orders: false,
				home: false,
			};
		default:
			return state;
	}
};
