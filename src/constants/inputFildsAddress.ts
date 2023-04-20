import type { InputAddressState } from '~/reducer/InputAddressReducer';

type inputFildsAddressType = {
	placeholder: string;
	value: string | null;
	name: string;
};
export const inputFildsAddress = (
	input: InputAddressState
): inputFildsAddressType[] => {
	return [
		{
			placeholder: 'Имя',
			value: input.firstName,
			name: 'firstName',
		},
		{
			placeholder: 'Фамилия',
			value: input.lastName,
			name: 'lastName',
		},
		{
			placeholder: 'Город',
			value: input.citys,
			name: 'city',
		},
		{
			placeholder: 'Телефон',
			value: input.contactPhone,
			name: 'phone',
		},
		{
			placeholder: 'СДЭК ПВЗ',
			value: input.point,
			name: 'cdek',
		},
	];
};
