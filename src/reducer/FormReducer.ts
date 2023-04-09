interface FormProductState {
	name: string;
	description: string;
	image: string;
	category: string;
	price: number;
	quantity: number;
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
	payload: string;
}
interface SetCategoryAction {
	type: 'SET_CATEG';
	payload: string;
}
interface SetPriceAction {
	type: 'SET_PRICE';
	payload: number;
}
interface SetQuantityAction {
	type: 'SET_QT';
	payload: number;
}
interface SetClearAction {
	type: 'SET_CLEAR';
	payload: FormProductState;
}

type Action =
	| SetCategoryAction
	| SetNameAction
	| SetDescriptionAction
	| SetImageAction
	| SetPriceAction
	| SetQuantityAction
	| SetClearAction;

export const initialState: FormProductState = {
	name: '',
	description: '',
	image: '',
	category: '',
	price: 0,
	quantity: 0,
};

export const FormProductReducer = (
	state: FormProductState,
	action: Action
): FormProductState => {
	switch (action.type) {
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
		case 'SET_QT':
			return { ...state, quantity: action.payload };
		case 'SET_CLEAR':
			return {
				category: '',
				description: '',
				image: '',
				name: '',
				price: 0,
				quantity: 0,
			};
	}
};
