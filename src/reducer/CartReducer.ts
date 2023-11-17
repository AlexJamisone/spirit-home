export type CartItem = {
	id: string;
	quantity: number;
	title: string;
	image: string;
	price: number;
	size: string;
};

export type CartState = {
	items: CartItem[];
	totalPrice: number;
};

interface SetAddToCart {
	type: 'ADD_TO_CART';
	payload: {
		id: string;
		title: string;
		size: string;
		price: number;
		image: string;
	};
}

interface SetRemoveFromCart {
	type: 'REMOVE_FROM_CART';
	payload: { id: string; size: string };
}

interface SetUpdateQtCart {
	type: 'UPDATE_QT';
	payload: { id: string; quantity: number; size: string };
}
interface SetClearCart {
	type: 'CLER_CART';
}

export type CartAction =
	| SetAddToCart
	| SetRemoveFromCart
	| SetUpdateQtCart
	| SetClearCart;

const CART_STORAGE_KEY = 'cart';

const getCartFromLocalStorage = (): CartState | null => {
	if (typeof window !== 'undefined' && window.localStorage) {
		const cartJSON = window.localStorage.getItem(CART_STORAGE_KEY);
		if (cartJSON) {
			return JSON.parse(cartJSON) as CartState;
		}
	}
	return null;
};

const saveCartToLocalStorage = (cart: CartState) => {
	if (typeof window !== 'undefined' && window.localStorage) {
		window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
	}
};

export const initialState: CartState = getCartFromLocalStorage() || {
	items: [],
	totalPrice: 0,
};

export const cartReducer = (
	state: CartState = initialState,
	action: CartAction
): CartState => {
	switch (action.type) {
		case 'ADD_TO_CART': {
			const find = state.items.find(
				(item) =>
					item.id === action.payload.id &&
					item.size === action.payload.size
			);
			const newTotalPrice = state.totalPrice + action.payload.price;
			if (!find) {
				const newItem: CartItem = {
					...action.payload,
					quantity: 1,
				};
				const newState: CartState = {
					...state,
					items: [...state.items, newItem],
					totalPrice: newTotalPrice,
				};
				saveCartToLocalStorage(newState);
				return newState;
			} else {
				const updatedItems = state.items.map((item) => {
					if (
						item.id === action.payload.id &&
						item.size === action.payload.size
					) {
						return {
							...item,
							quantity: item.quantity + 1,
						};
					}
					return item;
				});
				const newState: CartState = {
					...state,
					items: updatedItems,
					totalPrice: newTotalPrice,
				};
				saveCartToLocalStorage(newState);
				return newState;
			}
		}
		case 'REMOVE_FROM_CART': {
			const removedItem = state.items.find(
				(item) =>
					item.id === action.payload.id &&
					item.size === action.payload.size
			);
			if (removedItem) {
				const updatedItems = state.items.filter(
					(item) =>
						!(
							item.id === action.payload.id &&
							item.size === action.payload.size
						)
				);
				const updatedTotalPrice =
					state.totalPrice - removedItem.price * removedItem.quantity;
				const newState: CartState = {
					...state,
					items: updatedItems,
					totalPrice: updatedTotalPrice,
				};
				saveCartToLocalStorage(newState);
				return newState;
			}
			return state;
		}
		case 'UPDATE_QT': {
			const updatedItems = state.items.map((item) => {
				if (
					item.id === action.payload.id &&
					item.size === action.payload.size
				) {
					return {
						...item,
						quantity: action.payload.quantity,
					};
				}
				return item;
			});
			const updatedTotalPrice = updatedItems.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			);
			const newState: CartState = {
				...state,
				items: updatedItems,
				totalPrice: updatedTotalPrice,
			};
			saveCartToLocalStorage(newState);
			return newState;
		}
		case 'CLER_CART': {
		}
		default: {
			return state;
		}
	}
};
