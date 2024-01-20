import { DiscountType, ProtectionType } from '@prisma/client';
import { create } from 'zustand';
import { ZodError } from './types';
type DiscountState = {
	inputs: {
		code: string;
		value: number;
        max: number
	};
	radio: {
		type: DiscountType;
		protection: ProtectionType;
	};
	error?: {
		isError: boolean;
		error: ZodError;
	};
};
export type DiscountInputValue = DiscountState['inputs'];
export type DiscountRadioValue = DiscountState['radio'];
type DiscountAction = {
	setInputs: (inputs: DiscountInputValue) => void;
	setRadio: (radio: DiscountRadioValue) => void;
	setClear: () => void;
	setError: (err: DiscountState['error']) => void;
    reset: () => void
};
type Discount = DiscountState & DiscountAction;
const initial: DiscountState = {
	inputs: {
		code: '',
        value: 0,
        max: 0
	},
	radio: {
		type: 'PROCENT',
		protection: 'PUBCLIC',
	},
};
export const useDiscount = create<Discount>((set) => ({
	...initial,
	setRadio: (radio) =>
		set((state) => ({ radio: { ...state.radio, ...radio } })),
	setInputs: (input) =>
		set((state) => ({ inputs: { ...state.inputs, ...input } })),
	setClear: () => set(initial),
	setError: (error) => set({ error }),
    reset: () => set(state => ({...state, error: undefined}))
}));
