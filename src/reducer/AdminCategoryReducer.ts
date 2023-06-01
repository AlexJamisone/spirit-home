type AdminCategoryState = {
	id: string;
	title: string;
	path: string;
	subId: string;
	subTitle: string;
	subPath: string;
	controls: {
		edit: boolean;
		select: boolean;
	};
};

interface SetIdAction {
	type: 'SET_ID';
	payload: string;
}
interface SetTitleAction {
	type: 'SET_TITLE';
	payload: string;
}
interface SetPathAction {
	type: 'SET_PATH';
	payload: string;
}
interface SetSubIdAction {
	type: 'SET_SUB_ID';
	payload: string;
}
interface SetSubTitleAction {
	type: 'SET_SUB_TITLE';
	payload: string;
}
interface SetSubPathAction {
	type: 'SET_SUB_PATH';
	payload: string;
}
interface SetControlsAction {
	type: 'SET_CONTROLS';
	payload: {
		edit: boolean;
		select: boolean;
	};
}
interface SetAllAction {
	type: 'SET_ALL';
	payload: AdminCategoryState;
}
interface SetClearAction {
	type: 'SET_CLEAR';
}

type Action =
	| SetIdAction
	| SetTitleAction
	| SetPathAction
	| SetSubIdAction
	| SetSubIdAction
	| SetSubTitleAction
	| SetSubPathAction
	| SetControlsAction
	| SetAllAction
	| SetClearAction;

export const initialState: AdminCategoryState = {
	id: '',
	title: '',
	path: '',
	subId: '',
	subTitle: '',
	subPath: '',
	controls: {
		edit: false,
		select: false,
	},
};

export const AdminCategorysReducer = (
	state: AdminCategoryState,
	action: Action
): AdminCategoryState => {
	switch (action.type) {
		case 'SET_ID':
			return { ...state, id: action.payload };
		case 'SET_TITLE':
			return { ...state, title: action.payload };
		case 'SET_PATH':
			return { ...state, path: action.payload };
		case 'SET_SUB_ID':
			return { ...state, subId: action.payload };
		case 'SET_SUB_TITLE':
			return { ...state, subTitle: action.payload };
		case 'SET_SUB_PATH':
			return { ...state, subPath: action.payload };
		case 'SET_CONTROLS':
			return {
				...state,
				controls: {
					edit: action.payload.edit,
					select: action.payload.select,
				},
			};
		case 'SET_ALL':
			return {
				...state,
				...action.payload,
			};
		case 'SET_CLEAR':
			return {
				id: '',
				title: '',
				path: '',
				subId: '',
				subTitle: '',
				subPath: '',
				controls: {
					edit: false,
					select: false,
				},
			};
	}
};
