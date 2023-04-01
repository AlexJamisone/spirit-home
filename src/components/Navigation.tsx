import { Box, Link as ChakraLink, Icon } from '@chakra-ui/react';
import { UserButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { SlHandbag } from 'react-icons/sl';
import Logo from './Logo';
const Navigation = () => {
	const { isSignedIn,  } = useAuth();
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
			children: isSignedIn ? 'Профиль' : 'Войти',
			path: isSignedIn ? '/profile' : '/signin',
		},
		{
			children: <Icon as={SlHandbag} boxSize={6} />,
			path: '/cart',
		},
	]
	
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
			{isSignedIn ? <UserButton /> : null}
		</Box>
	);
};

export default Navigation;
