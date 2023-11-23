import { create } from 'zustand';
import {
	getFromLocalStorage,
	saveToLocalStorage,
} from '~/helpers/localStorage';

type CartItem = {
	id: string;
	quantity: number;
	size: string;
	title: string;
	image: string;
	price: number;
};

type CartState = {
	items: CartItem[];
	total: number;
};

type CartAction = {
	add: (item: Omit<CartItem, 'quantity'>) => void;
	remove: (id: string, size: string) => void;
	update: (id: string, size: string, quantity: number) => void;
	clear: () => void;
};

type Cart = CartState & CartAction;
const CART_STORAGE_KEY = 'cart';
const initialState: CartState = {
	items: [],
	total: 0,
};
const initial: CartState = getFromLocalStorage(CART_STORAGE_KEY) || {
	...initialState,
};

export const useCart = create<Cart>((set) => ({
	...initial,
	add: (item) =>
		set((state) => {
			const find = state.items.find(
				(itm) => itm.id === item.id && itm.size === item.size
			);
			const newTotal = state.total + item.price;
			if (!find) {
				const newState: CartState = {
					items: [...state.items, { ...item, quantity: 1 }],
					total: newTotal,
				};
				saveToLocalStorage(newState, CART_STORAGE_KEY);
				return {
					...state,
					...newState,
				};
			} else {
				const update = state.items.map((itm) => {
					if (itm.id === item.id && itm.size === item.size)
						return {
							...itm,
							quantity: itm.quantity + 1,
						};
					return itm;
				});
				const newState: CartState = {
					items: update,
					total: newTotal,
				};
				saveToLocalStorage(newState, CART_STORAGE_KEY);
				return {
					...state,
					...newState,
				};
			}
		}),
	remove: (id, size) =>
		set((state) => {
			const removedItem = state.items.find(
				(itm) => itm.id === id && itm.size === size
			);
			if (removedItem) {
				const update = state.items.filter(
					(itm) => !(itm.id === id && itm.size === size)
				);
				const updateTotal =
					state.total - removedItem.price * removedItem.quantity;
				const newState: CartState = {
					items: update,
					total: updateTotal,
				};
				saveToLocalStorage(newState, CART_STORAGE_KEY);
				return {
					...state,
					...newState,
				};
			}
			return state;
		}),
	update: (id, size, quantity) =>
		set((state) => {
			const update = state.items.map((itm) => {
				if (itm.id === id && itm.size === size)
					return {
						...itm,
						quantity,
					};
				return itm;
			});
			const updateTotal = update.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			);
			const newState: CartState = {
				items: update,
				total: updateTotal,
			};
			saveToLocalStorage(newState, CART_STORAGE_KEY);
			return {
				...state,
				...newState,
			};
		}),
	clear: () =>
		set((state) => {
			saveToLocalStorage(initialState, CART_STORAGE_KEY);
			return {
				...state,
				...initialState,
			};
		}),
}));
