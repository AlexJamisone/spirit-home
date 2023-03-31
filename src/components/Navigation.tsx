import { Box, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import Logo from './Logo';
const Navigation = () => {
	const links = [
		{
			children: <Logo />,
			path: '/',
		},
		{
			children: 'Продукт',
			path: '/products',
		},
		{
			children: 'О нас',
			path: '/about',
		},
		{
			children: 'Доставка/Оплата',
			path: '/devilery',
		},
		{
			children: 'Вход',
			path: '/signin',
		},
	];

	return (
		<Box
			as="nav"
			display="flex"
			justifyContent="space-evenly"
			alignItems="center"
		>
			{links.map(({ children, path }) => (
				<ChakraLink
					as={Link}
					href={path}
					key={path}
					_hover={{
						textDecoration: 'none',
					}}
				>
					{children}
				</ChakraLink>
			))}
		</Box>
	);
};

export default Navigation;
