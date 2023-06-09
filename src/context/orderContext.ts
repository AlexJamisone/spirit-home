import type { Point } from '@prisma/client';
import {
	createContext,
	useContext,
	type Dispatch,
	type RefObject,
	type SetStateAction,
} from 'react';
import type {
	DaDataAddress,
	DaDataAddressSuggestion,
	DaDataSuggestion,
} from 'react-dadata';
import type { Action, InputAddressState } from '~/reducer/InputAddressReducer';

interface OrderContext {
	input: InputAddressState;
	dispatch: Dispatch<Action>;
	handlSubmit: () => void;
	onClose: () => void;
	isError: boolean;
	error?: string[];
	passwordLengthError?: string;
	isLoading: boolean;
	initialRef: RefObject<HTMLInputElement>;
	resetNoAuth: () => void;
	resetNoAddress: () => void;
	handlPoints: (
		suggestion: DaDataSuggestion<DaDataAddress> | undefined
	) => void;
	valueSuggestion?: DaDataAddressSuggestion;
	setValueSuggestion: Dispatch<
		SetStateAction<DaDataAddressSuggestion | undefined>
	>;
	points?: Point[];
	isLoadingCdek: boolean;
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
