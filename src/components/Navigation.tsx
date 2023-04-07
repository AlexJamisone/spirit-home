import {
	Box,
	Link as ChakraLink,
	Icon,
	Spinner,
	Stack,
} from '@chakra-ui/react';
import { UserButton, useAuth, ClerkLoading } from '@clerk/nextjs';
import Link from 'next/link';
import { SlHandbag } from 'react-icons/sl';
import Logo from '../assets/Logo';
import Category from './Category';
const Navigation = () => {
	const { isSignedIn } = useAuth();
	const links = [
		{
			children: 'О нас',
			path: '/about',
		},
		{
			children: 'Доставка/Оплата',
			path: '/devilery',
		},
		{
			children: 'Войти',
			path: '/signin',
		},
		{
			children: <Icon as={SlHandbag} boxSize={6} />,
			path: '/cart',
		},
	];
	if (isSignedIn) {
		links.splice(2, 1);
	}
	return (
		<Box
			as="nav"
			display="flex"
			alignItems="center"
			justifyContent="space-between"
		>
			<ChakraLink as={Link} href="/" alignSelf="flex-start" ml="60">
				<Logo />
			</ChakraLink>
			<Stack
				direction="row"
				justifyContent="flex-end"
				gap={10}
				mr="60"
				alignItems="center"
			>
				<Category />
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
				{isSignedIn ? (
					<UserButton />
				) : (
					<ClerkLoading>
						<Spinner />
					</ClerkLoading>
				)}
			</Stack>
		</Box>
	);
};

export default Navigation;
