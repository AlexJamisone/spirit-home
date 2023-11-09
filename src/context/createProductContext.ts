import type { Size } from '@prisma/client';
import { createContext, useContext, type ChangeEvent } from 'react';
import type { Action, FormProductState } from '~/reducer/FormReducer';

type CreateProductContext = {
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handlDeletImage: (path: string, index: number) => void;
	size: Size[] | undefined;
	form: FormProductState;
	dispatch: (value: Action) => void;
	onClose: () => void;
	toggleAlert: () => void;
	openAlert: boolean;
	onCloseAlert: () => void;
	path: string[];
	isLoading: boolean;
	error:
		| {
				[x: string]: string[] | undefined;
				[x: number]: string[] | undefined;
				[x: symbol]: string[] | undefined;
		  }
		| undefined;
	isError: boolean;
	reset: () => void;
};

const CreateProductContext = createContext<CreateProductContext | null>(null);

export function useCreateProductContext() {
	const context = useContext(CreateProductContext);
	if (!context)
		throw new Error(
			'CreateProduct.* component must be render as a child of CreateProduct comopnent'
		);
	return context;
}

export default CreateProductContext;
