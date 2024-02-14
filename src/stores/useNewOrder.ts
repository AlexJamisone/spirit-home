import type { DaDataAddressSuggestion } from 'react-dadata';
import { create } from 'zustand';
import type { FiltredPoint } from '~/server/api/routers/cdek';

export type NewOrderInput = {
	firstName: string;
	lastName: string;
	contactPhone: string;
	comment: string;
};

type NewOrderControl = {
	saveAcc: boolean;
	showMap: boolean;
	showPVZ: boolean;
	selectedPVZ: boolean;
	errorSelectedPVZ: boolean;
	edit: boolean;
};

type NewOrderAcc = {
	email: string;
	password: string;
};
type NewOrderAddress = {
	id?: string;
	points?: FiltredPoint[];
	selectedPoint?: FiltredPoint;
	valueSuggestion?: DaDataAddressSuggestion;
	updateName?: boolean;
};

type NewOrderError =
	| {
			[x: string]: string[] | undefined;
			[x: number]: string[] | undefined;
			[x: symbol]: string[] | undefined;
	  }
	| undefined;

type NewOrderState = {
	inputs: NewOrderInput;
	controls: NewOrderControl;
	acc: NewOrderAcc;
	address: NewOrderAddress;
	error?: NewOrderError;
};
type NewOrderAction = {
	setInput: (input: NewOrderInput) => void;
	setControls: (ctrl: Partial<NewOrderControl>) => void;
	setAcc: (acc: NewOrderAcc) => void;
	setClear: () => void;
	setPoint: (address: NewOrderAddress) => void;
	setError: (error: NewOrderError) => void;
	resetError: () => void;
};
type NewOrder = NewOrderState & NewOrderAction;

const initial: NewOrderState = {
	inputs: {
		contactPhone: '',
		firstName: '',
		lastName: '',
		comment: '',
	},
	controls: {
		edit: false,
		errorSelectedPVZ: false,
		saveAcc: false,
		selectedPVZ: false,
		showMap: false,
		showPVZ: false,
	},
	acc: {
		email: '',
		password: '',
	},
	address: {
		id: '',
		updateName: true,
	},
};

export const useNewOrder = create<NewOrder>((set) => ({
	...initial,
	setInput: (input) =>
		set((state) => ({ inputs: { ...state.inputs, ...input } })),
	setControls: (ctrl) =>
		set((state) => ({ controls: { ...state.controls, ...ctrl } })),
	setAcc: (acc) => set((state) => ({ acc: { ...state.acc, ...acc } })),
	setClear: () => set(initial),
	setPoint: (address) =>
		set((state) => ({ address: { ...state.address, ...address } })),
	setError: (error) =>
		set((state) => ({ error: { ...state.error, ...error } })),
	resetError: () => set((state) => ({ ...state, error: undefined })),
}));
