import {
	createContext,
	useContext,
	type Dispatch,
	type SetStateAction,
} from 'react';
import type { DaDataAddressSuggestion } from 'react-dadata';
import type { Points } from '~/server/api/routers/cdek';

type AddressContext = {
	value?: DaDataAddressSuggestion;
	points?: Points[];
	select?: Points;
	setSelect: Dispatch<SetStateAction<Points | undefined>>;
	showPVZ: boolean;
	setShowPVZ: Dispatch<SetStateAction<boolean>>;
};

const AddressContext = createContext<AddressContext | null>(null);

export function useAddressContext() {
	const context = useContext(AddressContext);
	if (!context)
		throw new Error(
			'Address.* component must be render as a child of Address comopnent'
		);
	return context;
}

export default AddressContext;
