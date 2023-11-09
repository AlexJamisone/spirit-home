export interface FormProductState {
	id: string;
	name: string;
	description: string;
	image: string[];
	category: {
		id: string;
		title: string;
		sub: boolean;
	};
	price: number;
	size: string[];
	edit: boolean;
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
	payload: string[];
}
interface SetCategoryAction {
	type: 'SET_CATEG';
	payload: { id: string; title: string; sub: boolean };
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
	type: 'SET_SIZE';
	payload: string;
}
interface SetEditAction {
	type: 'SET_EDIT';
	payload: boolean;
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
	| SetEditAction;

export const initialState: FormProductState = {
	id: '',
	name: '',
	description: '',
	image: [],
	category: {
		id: '',
		title: '',
		sub: false,
	},
	price: 0,
	size: [],
	edit: false,
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
			return {
				...state,
				category: {
					id: action.payload.id,
					title: action.payload.title,
					sub: action.payload.sub,
				},
			};
		case 'SET_PRICE':
			return { ...state, price: action.payload };
		case 'SET_CLEAR':
			return initialState;
		case 'SET_ALL':
			return {
				...state,
				...action.payload,
			};
		case 'SET_SIZE': {
			const idx = state.size.findIndex((size) => size === action.payload);
			if (idx === -1) {
				return {
					...state,
					size: [...state.size, action.payload],
				};
			} else {
				return {
					...state,
					size: state.size.filter(
						(value) => value !== action.payload
					),
				};
			}
		}
		default:
			return state;
	}
};
