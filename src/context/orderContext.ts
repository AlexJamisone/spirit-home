import {
	createContext,
	useContext,
	type Dispatch,
	type RefObject,
} from 'react';
import type { Action, InputAddressState } from '~/reducer/InputAddressReducer';

const NewOrderContext = createContext<{
	input: InputAddressState;
	dispatch: Dispatch<Action>;
	handlSubmit: (idAddress: string) => void;
	onClose: () => void;
	isSignedIn?: boolean;
	isLoading: boolean;
	initialRef: RefObject<HTMLInputElement>;
} | null>(null);

export function useNewOrderContext() {
	const context = useContext(NewOrderContext);
	if (!context)
		throw new Error(
			'newOrder.* component must be render as a child of newOrder comopnent'
		);
	return context;
}

export default NewOrderContext;
