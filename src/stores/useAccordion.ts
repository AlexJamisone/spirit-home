import { create } from 'zustand';
import type { ZodError } from './types';

export type AccordionState = {
	input: {
		content: string;
		title: string;
	};
	isEdit: {
		edit: boolean;
		id: string;
	};
	error?: {
		isError: boolean;
		msg?: ZodError;
	};
};

type AccordionAction = {
	setInput: (input: AccordionState['input']) => void;
	setEdit: (isEdit: boolean, id: string) => void;
	setClear: () => void;
	setError: (isError: boolean, msg?: ZodError) => void;
	reset: () => void;
};

type Accordion = AccordionState & AccordionAction;

const initial: AccordionState = {
	input: {
		content: '',
		title: '',
	},
	isEdit: {
		edit: false,
		id: '',
	},
};

export const useAccordion = create<Accordion>((set) => ({
	...initial,
	setInput: (input) =>
		set((state) => ({ input: { ...state.input, ...input } })),
	setEdit: (isEdit, id) => set(() => ({ isEdit: { edit: isEdit, id } })),
	setClear: () => set(() => initial),
	setError: (isError, msg) => set(() => ({ error: { isError, msg } })),
	reset: () => set(() => ({ error: undefined })),
}));
