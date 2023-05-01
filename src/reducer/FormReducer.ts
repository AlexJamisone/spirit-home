import type { Size } from '@prisma/client';
import type { UploadResult } from '~/utils/uploadImage';

export interface FormProductState {
	id: string;
	name: string;
	description: string;
	image: UploadResult[];
	category: string;
	price: number;
	size: Size[];
}

interface SetIdAction {
	type: 'SET_ID';
	payload: string;
}
interface SetNameAction {
	type: 'SET_NAME';
	payload: string;
}
interface SetDescriptionAction {
	type: 'SET_DESCR';
	payload: string;
}
interface SetImageAction {
	type: 'SET_IMG';
	payload: UploadResult[];
}
interface SetCategoryAction {
	type: 'SET_CATEG';
	payload: string;
}
interface SetPriceAction {
	type: 'SET_PRICE';
	payload: number;
}
interface SetSizeAction {
	type: 'SET_SIZE';
	payload: Size;
}

interface SetClearAction {
	type: 'SET_CLEAR';
}

interface SetAllAction {
	type: 'SET_ALL';
	payload: FormProductState;
}

export type Action =
	| SetCategoryAction
	| SetNameAction
	| SetDescriptionAction
	| SetImageAction
	| SetPriceAction
	| SetSizeAction
	| SetClearAction
	| SetAllAction
	| SetIdAction;

export const initialState: FormProductState = {
	id: '',
	name: '',
	description: '',
	image: [],
	category: '',
	price: 0,
	size: [],
};

export const FormProductReducer = (
	state: FormProductState,
	action: Action
): FormProductState => {
	switch (action.type) {
		case 'SET_ID':
			return { ...state, id: action.payload };
		case 'SET_NAME':
			return { ...state, name: action.payload };
		case 'SET_DESCR':
			return { ...state, description: action.payload };
		case 'SET_IMG':
			return { ...state, image: action.payload };
		case 'SET_CATEG':
			return { ...state, category: action.payload };
		case 'SET_PRICE':
			return { ...state, price: action.payload };
		case 'SET_SIZE':
			const itemsIndex = state.size.findIndex(
				(item) => item.id === action.payload.id
			);
			if (itemsIndex === -1) {
				return {
					...state,
					size: [...state.size, { ...action.payload }],
				};
			} else {
				const updateItem = {
					...state.size[itemsIndex],
					quantity: action.payload.quantity,
				};
				const updatedItems = [...state.size];
				updatedItems[itemsIndex] = updateItem as Size;
				return {
					...state,
					size: updatedItems,
				};
			}
		case 'SET_CLEAR':
			return {
				id: '',
				category: '',
				description: '',
				image: [],
				name: '',
				price: 0,
				size: [],
			};
		case 'SET_ALL':
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
