export interface InputAddressState {
	id: string;
	firstName: string;
	lastName: string;
	citys: string;
	contactPhone: string;
	point: string;
	saveAcc: boolean;
	saveAddress: boolean;
	email: string;
	password: string;
	idAddress: string;
}

interface SetIdAction {
	type: 'SET_ID';
	payload: string;
}
interface SetIdAddressAction {
	type: 'SET_ID_ADDRESS';
	payload: string;
}
interface SetSaveAccAction {
	type: 'SET_SAVE_ACC';
	payload: boolean;
}
interface SetSaveAddressAction {
	type: 'SET_SAVE_ADDRESS';
	payload: boolean;
}
interface SetEmailAction {
	type: 'SET_EMAIL';
	payload: string;
}
interface SetPasswordAction {
	type: 'SET_PASSWORD';
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
	| SetIdAction
	| SetSaveAccAction
	| SetSaveAddressAction
	| SetEmailAction
	| SetPasswordAction
	| SetIdAddressAction;

export const initialState: InputAddressState = {
	id: '',
	firstName: '',
	lastName: '',
	citys: '',
	contactPhone: '',
	point: '',
	email: '',
	password: '',
	idAddress: '',
	saveAcc: false,
	saveAddress: false,
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
		case 'SET_SAVE_ACC':
			return { ...state, saveAcc: action.payload };
		case 'SET_SAVE_ADDRESS':
			return { ...state, saveAddress: action.payload };
		case 'SET_EMAIL':
			return { ...state, email: action.payload };
		case 'SET_PASSWORD':
			return { ...state, password: action.payload };
		case 'SET_ID_ADDRESS':
			return { ...state, idAddress: action.payload };
		case 'SET_CLEAR':
			return {
				id: '',
				citys: '',
				contactPhone: '',
				firstName: '',
				lastName: '',
				point: '',
				email: '',
				password: '',
				idAddress: '',
				saveAcc: false,
				saveAddress: false,
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
