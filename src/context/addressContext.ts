import type { Point } from '@prisma/client';
import {
	createContext,
	useContext,
	type Dispatch,
	type RefObject,
} from 'react';
import type {
	AddressSuggestions,
	DaDataAddress,
	DaDataAddressSuggestion,
	DaDataSuggestion,
} from 'react-dadata';
import type { Action, InputAddressState } from '~/reducer/InputAddressReducer';

export interface CreateAddressContext {
	input: InputAddressState;
	dispatch: Dispatch<Action>;
	initialRef?: RefObject<HTMLInputElement>;
	action?: () => void;
	error?: string[];
	isError: boolean;
	handlPoints: (
		suggestion: DaDataSuggestion<DaDataAddress> | undefined
	) => void;
	isLoadingCdek: boolean;
	valueSuggestion: DaDataAddressSuggestion | undefined;
	points?: Point[];
	suggestionsRef?: RefObject<AddressSuggestions>;
}

const AddressContext = createContext<CreateAddressContext | null>(null);

export function useCreateAddressContext() {
	const context = useContext(AddressContext);
	if (!context)
		throw new Error(
			'CreateAddress.* component must be render as a child of CreateAddress comopnent'
		);
	return context;
}

export default AddressContext;
