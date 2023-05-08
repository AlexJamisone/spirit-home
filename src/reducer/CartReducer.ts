/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import type { Product, ProductPriceHistory } from '@prisma/client';

type ProductWithPriceHistory = Product & {
	selectedSize: { id: string; name: string };
	priceHistory: ProductPriceHistory[];
};
export interface CartItem extends ProductWithPriceHistory {
	quantityInCart: number;
}

export type CartState = {
	items: CartItem[];
	totalPrice: number;
};

interface SetAddToCart {
	type: 'ADD_TO_CART';
	payload: ProductWithPriceHistory;
}

interface SetRemoveFromCart {
	type: 'REMOVE_FROM_CART';
	payload: { id: string; sizeId: string };
}

interface SetUpdateQtCart {
	type: 'UPDATE_QT';
	payload: { id: string; quantity: number; sizeId: string };
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
			const itemsIndex = state.items.findIndex(
				(item) =>
					item.id === action.payload.id &&
					item.selectedSize.id === action.payload.selectedSize.id
			);
			if (itemsIndex === -1) {
				const newItem: CartItem = {
					...action.payload,
					quantityInCart: 1,
				};
				const price = action.payload.priceHistory[0]?.price;
				if (!price) return state;
				const newState = {
					...state,
					items: [...state.items, newItem],
					totalPrice: state.totalPrice + price,
				};
				saveCartToLocalStorage(newState);
				return newState;
			} else {
				const updatedItem = {
					...state.items[itemsIndex]!,
					quantityInCart: state.items[itemsIndex]!.quantityInCart + 1,
				};
				const updatedItems = [...state.items];
				updatedItems[itemsIndex] = updatedItem;
				const price = updatedItem.priceHistory[0]?.price;
				if (!price) return state;
				const newState = {
					...state,
					items: updatedItems,
					totalPrice: state.totalPrice + price,
				};
				saveCartToLocalStorage(newState);
				return newState;
			}
		}
		case 'REMOVE_FROM_CART': {
			const itemIndex = state.items.findIndex(
				(item) =>
					item.id === action.payload.id &&
					item.selectedSize.id === action.payload.sizeId
			);
			if (itemIndex === -1) {
				return state;
			} else {
				const removedItem = state.items[itemIndex];
				const updatedItems = state.items.filter(
					(item) =>
						item.id !== action.payload.id ||
						item.selectedSize.id !== action.payload.sizeId
				);
				const price = removedItem?.priceHistory[0]?.price;
				if (!price) return state;
				const newState = {
					...state,
					items: updatedItems,
					totalPrice:
						state.totalPrice - price * removedItem.quantityInCart,
				};
				saveCartToLocalStorage(newState);
				return newState;
			}
		}
		case 'UPDATE_QT': {
			const itemIndex = state.items.findIndex(
				(item) =>
					item.id === action.payload.id &&
					item.selectedSize.id === action.payload.sizeId
			);
			if (itemIndex === -1 || action.payload.quantity < 1) {
				return state;
			} else {
				const updatedItem = {
					...state.items[itemIndex]!,
					quantityInCart: action.payload.quantity,
				};
				const updatedItems = [...state.items];
				updatedItems[itemIndex] = updatedItem;
				const statePrice =
					state.items[itemIndex]?.priceHistory[0]?.price;
				if (!statePrice) return state;
				const updatePrice = updatedItem.priceHistory[0]?.price;
				if (!updatePrice) return state;
				const newTotalPrice =
					state.totalPrice -
					statePrice * state.items[itemIndex]!.quantityInCart +
					updatePrice * updatedItem.quantityInCart;
				const newState = {
					...state,
					items: updatedItems,
					totalPrice: newTotalPrice,
				};
				saveCartToLocalStorage(newState);
				return newState;
			}
		}
		case 'CLER_CART': {
			const newState = { ...state, items: [], totalPrice: 0 };
			saveCartToLocalStorage(newState);
			return newState;
		}
		default: {
			return state;
		}
	}
};
