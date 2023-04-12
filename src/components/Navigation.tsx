import {
	Box,
	Link as ChakraLink,
	Icon,
	Spinner,
	Stack,
	Text,
} from '@chakra-ui/react';
import { UserButton, useAuth, ClerkLoading } from '@clerk/nextjs';
import Link from 'next/link';
import { SlHandbag } from 'react-icons/sl';
import Logo from '../assets/Logo';
import Category from './Category';
import { useCart } from '~/context/cartContext';
import { useState, useEffect } from 'react';
const Navigation = () => {
	const { isSignedIn } = useAuth();
	const { cartState } = useCart();
	const [isLength, setIsLength] = useState(false);
	useEffect(() => {
		setIsLength(cartState.items.length > 0);
	}, [isLength, cartState.items.length]);
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
			children: (
				<>
					<Box position="relative" cursor='pointer'>
						<Icon as={SlHandbag} boxSize={6} />
						<Box
							position="absolute"
							textAlign="center"
							bottom="-10px"
							right="-10px"
							zIndex="10"
							width="25px"
							height="25px"
							bgColor="gray.200"
							display={'flex'}
							justifyContent="center"
							rounded="2xl"
							opacity={`${isLength ? 1 : 0}`}
							transition={'opacity .2s linear'}
							fontWeight={600}
						>
							<Text suppressHydrationWarning>
								{cartState.items.length}
							</Text>
						</Box>
					</Box>
				</>
			),
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
