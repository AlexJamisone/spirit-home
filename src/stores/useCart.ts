import { DiscountType } from '@prisma/client';
import { create } from 'zustand';
import {
	getFromLocalStorage,
	saveToLocalStorage,
} from '~/helpers/localStorage';

export type CartItem = {
	id: string;
	quantity: number;
	size: string;
	title: string;
	image: string;
	price: number;
	oldPrice?: number;
	discount: boolean;
};

type CartState = {
	items: CartItem[];
	total: number;
	discount: {
		id: string;
		active: boolean;
		word: string;
        applyCount: number
	};
};

type CartAction = {
	add: (item: Omit<CartItem, 'quantity'>) => void;
	remove: (id: string, size: string) => void;
	update: (id: string, size: string, quantity: number) => void;
	confirmPromo: ({
		ids,
		value,
		type,
		id,
		word,
	}: {
		ids: string[];
		value: number;
		type: DiscountType;
		id: string;
		word: string;
	}) => void;
	clear: () => void;
	setPromo: (word: string) => void;
	cancelPromo: () => void;
};

type Cart = CartState & CartAction;
const CART_STORAGE_KEY = 'cart';
const initialState: CartState = {
	items: [],
	total: 0,
	discount: {
		id: '',
		active: false,
		word: '',
        applyCount: 0
	},
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
					discount: state.discount,
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
					discount: state.discount,
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
					discount: state.discount,
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
				discount: state.discount,
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
	confirmPromo: ({ ids, type, value, id, word }) =>
		set((state) => {
			const update = state.items.map((item) => {
				if (ids.includes(item.id) && item.discount === false) {
					let newPrice = item.price;

					if (type === DiscountType.PROCENT) {
						newPrice -= (item.price * value) / 100;
					} else if (type === DiscountType.FIX) {
						newPrice -= value;
					}
                    state.discount.applyCount++
					return {
						...item,
						oldPrice: item.price,
						price: newPrice,
						discount: true,
					};
				}
				return item;
			});
			const newTotal = update.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			);

			const newState: CartState = {
				items: update,
				total: newTotal,
				discount: {
					id,
					word,
					active: true,
                    applyCount: state.discount.applyCount
				},
			};

			saveToLocalStorage(newState, CART_STORAGE_KEY);
			return {
				...state,
				...newState,
			};
		}),
	setPromo: (word) =>
		set((state) => ({ ...state, discount: { ...state.discount, word } })),
	cancelPromo: () =>
		set((state) => {
			const update = state.items.map((item) => {
				if (item.discount) {
					const updateItem: CartItem = {
						...item,
						discount: false,
						oldPrice: 0,
						price: item.oldPrice || 0,
					};
					return updateItem;
				}
				return item;
			});
			const updateTotal = update.reduce(
				(acc, current) => acc + current.price,
				0
			);
			const newState: CartState = {
				discount: {
					word: '',
					active: false,
					id: '',
                    applyCount: 0
				},
				items: update,
				total: updateTotal,
			};
			saveToLocalStorage(newState, CART_STORAGE_KEY);
			return {
				...state,
				...newState,
			};
		}),
}));
