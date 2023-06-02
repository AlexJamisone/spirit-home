import { createContext, useContext, type Dispatch } from 'react';
import type { AccordionState, Action } from '~/reducer/AccordionReducer';

export interface AccordionContext {
	state: AccordionState;
	dispatch: Dispatch<Action>;
	isOpen: boolean;
	onClose: () => void;
	onToggle: () => void;
}

const AccordionContex = createContext<AccordionContext | null>(null);

export function useAccordionContext() {
	const context = useContext(AccordionContex);
	if (!context)
		throw new Error(
			'Accordion.* component must be render as a child of Accordion comopnent'
		);
	return context;
}

export default AccordionContex;
