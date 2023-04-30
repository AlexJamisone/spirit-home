import type { InputAddressState } from '~/reducer/InputAddressReducer';

type inputFildsAddressType = {
	placeholder: string;
	value: string | null;
	name: string;
	errorMessage?: string;
};

function getErrorMessage(
	error: string[] | undefined,
	compairString: string
): string | undefined {
	return error?.filter((value) => value === compairString).toString();
}
export const inputFildsAddress = (
	input: InputAddressState,
	error?: string[]
): inputFildsAddressType[] => {
	return [
		{
			placeholder: 'Имя',
			value: input.firstName,
			name: 'firstName',
			errorMessage: getErrorMessage(error, 'Нужно ввести своё имя.'),
		},
		{
			placeholder: 'Фамилия',
			value: input.lastName,
			name: 'lastName',
			errorMessage: getErrorMessage(error, 'Нужо ввести свою фамилию.'),
		},
		{
			placeholder: 'Город',
			value: input.citys,
			name: 'city',
			errorMessage: getErrorMessage(error, 'Введи свой город.'),
		},
		{
			placeholder: 'Телефон',
			value: input.contactPhone,
			name: 'phone',
			errorMessage: getErrorMessage(
				error,
				'Неправельный номер телефона.'
			),
		},
		{
			placeholder: 'СДЭК ПВЗ',
			value: input.point,
			name: 'cdek',
			errorMessage: getErrorMessage(error, 'Выбери пунт выдачи СДЭК.'),
		},
	];
};
