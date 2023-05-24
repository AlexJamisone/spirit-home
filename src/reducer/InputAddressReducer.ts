import type { Points } from '~/server/api/routers/cdek';

export interface InputAddressState {
	id: string;
	firstName: string;
	lastName: string;
	contactPhone: string;
	point?: Points;
	saveAcc: boolean;
	email: string;
	password: string;
	idAddress: string;
	showMap: boolean;
	showPVZ: boolean;
	selectedPVZ: boolean;
	errorSelectedPVZ: boolean;
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
interface SetPhoneAction {
	type: 'SET_PHONE';
	payload: string;
}
interface SetPointAction {
	type: 'SET_POINT';
	payload: Points;
}
interface SetClearAction {
	type: 'SET_CLEAR';
}
interface SetAllAction {
	type: 'SET_ALL';
	payload: InputAddressState;
}
interface SetShowMapAction {
	type: 'SET_MAP';
	payload: boolean;
}
interface SetPVZAction {
	type: 'SET_PVZ';
	payload: boolean;
}
interface SetSelectedPVZAction {
	type: 'SET_SELECTED_PVZ';
	payload: boolean;
}
interface SetErrorSelectedPVZAction {
	type: 'SET_ERROR_SELECTED_PVZ';
	payload: boolean;
}

export type Action =
	| SetPhoneAction
	| SetNameAction
	| SetLastNameAction
	| SetPointAction
	| SetClearAction
	| SetAllAction
	| SetIdAction
	| SetSaveAccAction
	| SetEmailAction
	| SetPasswordAction
	| SetIdAddressAction
	| SetShowMapAction
	| SetPVZAction
	| SetSelectedPVZAction
	| SetErrorSelectedPVZAction;

export const initialState: InputAddressState = {
	id: '',
	firstName: '',
	lastName: '',
	contactPhone: '',
	email: '',
	password: '',
	idAddress: '',
	saveAcc: false,
	showMap: false,
	showPVZ: false,
	selectedPVZ: false,
	errorSelectedPVZ: false,
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
		case 'SET_PHONE':
			return { ...state, contactPhone: action.payload };
		case 'SET_POINT':
			return { ...state, point: action.payload };
		case 'SET_SAVE_ACC':
			return { ...state, saveAcc: action.payload };
		case 'SET_EMAIL':
			return { ...state, email: action.payload };
		case 'SET_PASSWORD':
			return { ...state, password: action.payload };
		case 'SET_ID_ADDRESS':
			return { ...state, idAddress: action.payload };
		case 'SET_MAP':
			return { ...state, showMap: action.payload };
		case 'SET_PVZ':
			return { ...state, showPVZ: action.payload };
		case 'SET_SELECTED_PVZ':
			return { ...state, selectedPVZ: action.payload };
		case 'SET_ERROR_SELECTED_PVZ':
			return { ...state, errorSelectedPVZ: action.payload };
		case 'SET_CLEAR':
			return {
				id: '',
				contactPhone: '',
				firstName: '',
				lastName: '',
				point: undefined,
				email: '',
				password: '',
				idAddress: '',
				saveAcc: false,
				showMap: false,
				showPVZ: false,
				selectedPVZ: false,
				errorSelectedPVZ: false,
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
