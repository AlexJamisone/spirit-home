import type { InputAddressState } from '~/reducer/InputAddressReducer';

type inputFildsAddressType = {
	placeholder: string;
	value: string | null;
	name: string;
	errorMessage: string;
};
export const inputFildsAddress = (
	input: InputAddressState
): inputFildsAddressType[] => {
	return [
		{
			placeholder: 'Имя',
			value: input.firstName,
			name: 'firstName',
			errorMessage: 'Нужно ввести своё имя.',
		},
		{
			placeholder: 'Фамилия',
			value: input.lastName,
			name: 'lastName',
			errorMessage: 'Нужо ввести свою фамилию.',
		},
		{
			placeholder: 'Город',
			value: input.citys,
			name: 'city',
			errorMessage: 'Введите свой город',
		},
		{
			placeholder: 'Телефон',
			value: input.contactPhone,
			name: 'phone',
			errorMessage: 'Нужно ввести сво номер телефона',
		},
		{
			placeholder: 'СДЭК ПВЗ',
			value: input.point,
			name: 'cdek',
			errorMessage: 'Выбери пунт выдачи СДЭК',
		},
	];
};
