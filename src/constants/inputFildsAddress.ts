import type { InputAddressState } from '~/reducer/InputAddressReducer';

type inputFildsAddressType = {
	placeholder: string;
	value: string | null;
	name: string;
	errorMessage?: string;
};
export const inputFildsAddress = (
	input: InputAddressState,
	error?: string[]
): inputFildsAddressType[] => {
	return [
		{
			placeholder: 'Имя',
			value: input.firstName,
			name: 'firstName',
			errorMessage: error?.[0],
		},
		{
			placeholder: 'Фамилия',
			value: input.lastName,
			name: 'lastName',
			errorMessage: error?.[1],
		},
		{
			placeholder: 'Город',
			value: input.citys,
			name: 'city',
			errorMessage: error?.[2],
		},
		{
			placeholder: 'Телефон',
			value: input.contactPhone,
			name: 'phone',
			errorMessage: error?.[3],
		},
		{
			placeholder: 'СДЭК ПВЗ',
			value: input.point,
			name: 'cdek',
			errorMessage: error?.[4],
		},
	];
};
