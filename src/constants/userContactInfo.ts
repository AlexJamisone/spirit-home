type UserContactInfo = {
	id: number;
	placeholder: string;
	name: string;
};

export const userContactInfo: UserContactInfo[] = [
	{
		id: 1,
		placeholder: 'Имя',
		name: 'firstName',
	},
	{
		id: 2,
		placeholder: 'Фамилия',
		name: 'lastName',
	},
	{
		id: 3,
		placeholder: 'Телефон',
		name: 'contactPhone',
	},
];
