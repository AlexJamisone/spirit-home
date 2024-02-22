import { Link } from '@chakra-ui/next-js';
import { Stack } from '@chakra-ui/react';
import { UserButton, useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import Logo from '~/assets/Logo';
import { links } from '~/constants/links';
import CartMenu from '../Cart/CartMenu';
import CategoryMenu from '../Category/CategoryMenu';
import FavoritesButton from './FavoritesButton';

const Navigation = () => {
	const { isSignedIn } = useAuth();
	return (
		<Stack
			as="header"
			bgColor="brand"
			w="100%"
			zIndex={200}
			position="relative"
			borderBottomRadius="3xl"
		>
			<Stack
				as={motion.nav}
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				gap={5}
				mx={'75px'}
			>
				<Link href="/">
					<Logo />
				</Link>
				<Stack direction="row" gap={10} alignItems="center">
					<CategoryMenu />
					{links.map((link) => (
						<Link
							fontSize={14}
							fontFamily={`"Alata", sans-serif`}
							textColor="second"
							_hover={{
								textDecoration: 'none',
							}}
							href={link.path}
							key={link.children}
						>
							{link.children}
						</Link>
					))}
					{!isSignedIn && (
						<Link
							href="/signin"
							_hover={{ textDecoration: 'none' }}
                            fontSize={14}
                            textColor='second'
						>
							Войти
						</Link>
					)}
					<CartMenu />
					<UserButton afterSignOutUrl="/" />
					<FavoritesButton />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Navigation;
