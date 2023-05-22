import {
	createContext,
	useContext,
	type Dispatch,
	type RefObject,
} from 'react';
import type { Action, InputAddressState } from '~/reducer/InputAddressReducer';

interface OrderContext {
	input: InputAddressState;
	dispatch: Dispatch<Action>;
	handlSubmit: () => void;
	onClose: () => void;
	isSignedIn?: boolean;
	isError: boolean;
	error?: string[];
	passwordLengthError?: string;
	isLoading: boolean;
	initialRef: RefObject<HTMLInputElement>;
	resetNoAuth: () => void;
	resetNoAddress: () => void;
}

const NewOrderContext = createContext<OrderContext | null>(null);

export function useNewOrderContext() {
	const context = useContext(NewOrderContext);
	if (!context)
		throw new Error(
			'newOrder.* component must be render as a child of newOrder comopnent'
		);
	return context;
}

export default NewOrderContext;
