export type AccordionState = {
	id: string;
	title: string;
	content: string;
	edit: boolean;
};

interface SetIdAction {
	type: 'SET_ID';
	payload: string;
}
interface SetTitleAction {
	type: 'SET_TITLE';
	payload: string;
}
interface SetContentAction {
	type: 'SET_CONTENT';
	payload: string;
}
interface SetEditAction {
	type: 'SET_EDIT';
	payload: boolean;
}
interface SetAllAction {
	type: 'SET_ALL';
	payload: AccordionState;
}
interface SetClearAction {
	type: 'SET_CLEAR';
}

export type Action =
	| SetIdAction
	| SetTitleAction
	| SetContentAction
	| SetEditAction
	| SetAllAction
	| SetClearAction;

export const initialState: AccordionState = {
	id: '',
	content: '',
	title: '',
	edit: false,
};

export const AccordionReducer = (
	state: AccordionState,
	action: Action
): AccordionState => {
	switch (action.type) {
		case 'SET_ID':
			return { ...state, id: action.payload };
		case 'SET_TITLE':
			return { ...state, title: action.payload };
		case 'SET_CONTENT':
			return { ...state, content: action.payload };
		case 'SET_EDIT':
			return { ...state, edit: action.payload };
		case 'SET_ALL':
			return {
				...state,
				...action.payload,
			};
		case 'SET_CLEAR':
			return {
				id: '',
				content: '',
				title: '',
				edit: false,
			};
		default:
			return state;
	}
};
