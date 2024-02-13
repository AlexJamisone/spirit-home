type UserContactInfo = {
	id: number;
	placeholder: string;
	name: string;
	label: string;
};

export const userContactInfo: UserContactInfo[] = [
	{
		id: 1,
		placeholder: 'Введите Имя',
		name: 'firstName',
		label: 'Имя',
	},
	{
		id: 2,
		placeholder: 'Введите Фамилию',
		name: 'lastName',
		label: 'Фамилия',
	},
	{
		id: 3,
		placeholder: 'Введите телефон',
		name: 'contactPhone',
		label: 'Телефон',
	},
];
