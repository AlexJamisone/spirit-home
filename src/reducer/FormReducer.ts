import type { UploadResult } from '~/utils/uploadImage';

export type Quantity = {
	id: string;
	quantity: number;
	name: string;
	sizeId: string;
};

export interface FormProductState {
	id: string;
	name: string;
	description: string;
	image: UploadResult[];
	category: string;
	price: number;
	quantity: Quantity[];
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
interface SetQTAction {
	type: 'ADD_QT';
	payload: Quantity;
}
interface SetUpdateQTAction {
	type: 'UPDATE_QT';
	payload: { id: string; quantity: number; name: string; sizeId: string };
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
	| SetQTAction
	| SetUpdateQTAction
	| SetRemoveSizeAction;

export const initialState: FormProductState = {
	id: '',
	name: '',
	description: '',
	image: [],
	category: '',
	price: 0,
	quantity: [],
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
		case 'ADD_QT':
			return {
				...state,
				quantity: [...state.quantity, action.payload],
			};
		case 'UPDATE_QT':
			return {
				...state,
				quantity: state.quantity.map((qt) =>
					qt.id === action.payload.id
						? {
								...qt,
								quantity: action.payload.quantity,
								name: action.payload.name,
						  }
						: qt
				),
			};
		case 'REMOVE_SIZE':
			return {
				...state,
				quantity: state.quantity.filter(
					(qt) => qt.id !== action.payload
				),
			};
		case 'SET_CLEAR':
			return {
				id: '',
				category: '',
				description: '',
				image: [],
				name: '',
				price: 0,
				quantity: [],
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
