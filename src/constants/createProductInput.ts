import type { HTMLInputTypeAttribute } from 'react';
import type { CreateProductInput } from '~/stores/useCreateProduct';

type createProductInputType = {
	id: number;
	placeholder: string;
	label: string;
	name: keyof CreateProductInput;
	textarea?: boolean;
	type: HTMLInputTypeAttribute;
};

export const createProductInput: createProductInputType[] = [
	{
		id: 1,
		placeholder: 'Название продукта',
		label: 'Название',
		type: 'text',
		name: 'name',
	},
	{
		id: 2,
		placeholder: 'Описание товара',
		type: 'text',
		label: 'Придумай описание продукта',
		name: 'description',
		textarea: true,
	},
	{
		id: 3,
		type: 'number',
		placeholder: 'Цена, ₽',
		name: 'price',
		label: 'Цена',
	},
];
