import type { FormProductState } from '~/reducer/FormReducer';

type createProductInputType = {
	type: string;
	placeholder: string;
	value: string | number;
	name: string;
	textarea?: boolean;
	error: string[] | undefined;
};

export const createProductInput = (
	input: FormProductState,
	error:
		| {
				[x: string]: string[] | undefined;
				[x: number]: string[] | undefined;
				[x: symbol]: string[] | undefined;
		  }
		| undefined
): createProductInputType[] => {
	return [
		{
			type: 'text',
			placeholder: 'Название продукта',
			value: input.name,
			name: 'name',
			error: error?.name,
		},
		{
			type: 'text',
			placeholder: 'Описание товара',
			value: input.description,
			name: 'description',
			textarea: true,
			error: error?.description,
		},
		{
			type: 'number',
			placeholder: 'Цена, ₽',
			value: input.price,
			name: 'price',
			error: error?.price,
		},
	];
};
