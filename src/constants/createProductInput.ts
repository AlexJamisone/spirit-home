import type { FormProductState } from '~/reducer/FormReducer';

type createProductInputType = {
	type: string;
	placeholder: string;
	value: string | number;
	name: string;
	textarea?: boolean;
};

export const createProductInput = (
	input: FormProductState
): createProductInputType[] => {
	return [
		{
			type: 'text',
			placeholder: 'Название товара',
			value: input.name,
			name: 'name',
		},
		{
			type: 'text',
			placeholder: 'Описание товара',
			value: input.description,
			name: 'description',
			textarea: true,
		},
		{
			type: 'number',
			placeholder: 'Цена, ₽',
			value: input.price,
			name: 'price',
		},
		{
			type: 'number',
			placeholder: 'Кол-во',
			value: input.quantity,
			name: 'quantity',
		},
	];
};
