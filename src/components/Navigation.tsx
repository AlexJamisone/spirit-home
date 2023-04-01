import { Box, Link as ChakraLink, Icon } from '@chakra-ui/react';
import { useAuth, UserButton, useUser } from '@clerk/nextjs';
import { SlHandbag } from 'react-icons/sl';
import Link from 'next/link';
import Logo from './Logo';
import { api } from '~/utils/api';
const Navigation = () => {
	const { isSignedIn } = useAuth();
	const { user } = useUser();
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
	
	const { data } = api.users.getUser.useQuery({
		email: user?.emailAddresses[0]?.emailAddress as string,
	});
	console.log(data)
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
