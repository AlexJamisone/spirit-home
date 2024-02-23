type FooterLinks = {
	id: string;
	href: string;
	label: string;
};
export function footerLinks(isSignIn: boolean): FooterLinks[] {
	return [
		{
			id: isSignIn ? 'profile' : 'signin',
			href: isSignIn ? '/profile/main' : '/signin',
			label: isSignIn ? 'Профиль' : 'Вход' ,
		},

		{
			id: 'about',
			href: '/about',
			label: 'О нас',
		},
		{
			id: 'favorites',
			href: '/favorites',
			label: 'Избранное',
		},
		{
			id: 'devilery',
			href: '/devilery',
			label: 'Доставка и оплата',
		},
		{
			id: 'care',
			href: '/care',
			label: 'Уход за изделиями',
		},
	];
}
