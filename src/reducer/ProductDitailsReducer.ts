export type ProductDitailState = {
	size: string;
	error: {
		message: string;
		isError: boolean;
	} | null;
};

interface SetClear {
	type: 'SET_CLEAR';
}

interface SetError {
	type: 'SET_ERROR';
	payload: {
		isError: boolean;
		message: string;
	};
}
interface SetAll {
	type: 'SET_ALL';
	payload: ProductDitailState;
}

export type Action = SetClear | SetError | SetAll;

export const initial: ProductDitailState = {
	size: '',
	error: null,
};

export function productDitailsReducer(
	state: ProductDitailState,
	action: Action
): ProductDitailState {
	switch (action.type) {
		case 'SET_CLEAR': {
			return {
				error: null,
				size: '',
			};
		}
		case 'SET_ERROR': {
			return {
				...state,
				error: {
					isError: action.payload.isError,
					message: action.payload.message,
				},
			};
		}
		case 'SET_ALL': {
			return {
				error: action.payload.error,
				size:
					state.size === action.payload.size
						? ''
						: action.payload.size,
			};
		}
		default:
			return state;
	}
}
