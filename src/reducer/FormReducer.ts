import type { UploadResult } from '~/utils/uploadImage';

export type Size = {
	id: string;
	quantity?: number;
	name: string
};

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
interface SetClearAction {
	type: 'SET_CLEAR';
}

interface SetAllAction {
	type: 'SET_ALL';
	payload: FormProductState;
}
interface SetSizeAction {
	type: 'ADD_SIZE';
	payload: Size;
}
interface SetUpdateSizeAction {
	type: 'UPDATE_SIZE';
	payload: { id: string; quantity?: number, name: string};
}
interface SetRemoveSizeAction {
	type: 'REMOVE_SIZE';
	payload: string;
}

export type Action =
	| SetCategoryAction
	| SetNameAction
	| SetDescriptionAction
	| SetImageAction
	| SetPriceAction
	| SetClearAction
	| SetAllAction
	| SetIdAction
	| SetSizeAction
	| SetUpdateSizeAction
	| SetRemoveSizeAction;

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
		case 'ADD_SIZE':
			return {
				...state,
				size: [...state.size, action.payload],
			};
		case 'UPDATE_SIZE':
			return {
				...state,
				size: state.size.map((size) =>
					size.id === action.payload.id
						? { ...size, quantity: action.payload.quantity, name: action.payload.name }
						: size
				),
			};
		case 'REMOVE_SIZE':
			return {
				...state,
				size: state.size.filter((size) => size.id !== action.payload),
			};
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
