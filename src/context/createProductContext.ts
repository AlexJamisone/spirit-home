import type { Size } from '@prisma/client';
import {
	createContext,
	useContext,
	type ChangeEvent,
	type SetStateAction,
} from 'react';
import type { Action, FormProductState } from '~/reducer/FormReducer';
import type { UploadResult } from '~/utils/uploadImage';

type CreateProductContext = {
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handlDeletImage: (path: UploadResult, index: number) => void;
	size: Size[] | undefined;
	form: FormProductState;
	edit: boolean;
	dispatch: (value: Action) => void;
	setEdit: (value: SetStateAction<boolean>) => void;
	onClose: () => void;
	toggleAlert: () => void;
	openAlert: boolean;
	onCloseAlert: () => void;
	path: UploadResult[];
	isLoading: boolean;
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
