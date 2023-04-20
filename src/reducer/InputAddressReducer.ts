export interface InputAddressState {
	id: string;
	firstName: string;
	lastName: string;
	citys: string;
	contactPhone: string;
	point: string;
}

interface SetIdAction {
	type: 'SET_ID';
	payload: string;
}
interface SetNameAction {
	type: 'SET_NAME';
	payload: string;
}
interface SetLastNameAction {
	type: 'SET_LAST_NAME';
	payload: string;
}
interface SetCitysAction {
	type: 'SET_CITY';
	payload: string;
}
interface SetPhoneAction {
	type: 'SET_PHONE';
	payload: string;
}
interface SetPointAction {
	type: 'SET_POINT';
	payload: string;
}
interface SetClearAction {
	type: 'SET_CLEAR';
}
interface SetAllAction {
	type: 'SET_ALL';
	payload: InputAddressState;
}

export type Action =
	| SetPhoneAction
	| SetNameAction
	| SetLastNameAction
	| SetCitysAction
	| SetPointAction
	| SetClearAction
	| SetAllAction
	| SetIdAction;

export const initialState: InputAddressState = {
	id: '',
	firstName: '',
	lastName: '',
	citys: '',
	contactPhone: '',
	point: '',
};

export const InputAddressReducer = (
	state: InputAddressState,
	action: Action
): InputAddressState => {
	switch (action.type) {
		case 'SET_ID':
			return { ...state, id: action.payload };
		case 'SET_NAME':
			return { ...state, firstName: action.payload };
		case 'SET_LAST_NAME':
			return { ...state, lastName: action.payload };
		case 'SET_CITY':
			return { ...state, citys: action.payload };
		case 'SET_PHONE':
			return { ...state, contactPhone: action.payload };
		case 'SET_POINT':
			return { ...state, point: action.payload };
		case 'SET_CLEAR':
			return {
				id: '',
				citys: '',
				contactPhone: '',
				firstName: '',
				lastName: '',
				point: '',
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
