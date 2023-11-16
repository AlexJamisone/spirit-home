import { Link } from '@chakra-ui/next-js';
import { Stack, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { UserButton, useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { useEffect, useId, useState } from 'react';
import Logo from '~/assets/Logo';
import { links } from '~/constants/links';
import CartMenu from '../Cart/CartMenu';
import CategoryMenu from '../Category/CategoryMenu';
import FavoritesButton from './FavoritesButton';
import NavigationBarElement from './NavigationBarElement';

const Navigation = () => {
	const { isSignedIn } = useAuth();
	const usrBtnId = useId();
	const [isTablet] = useMediaQuery(['(max-width: 930px)']);
	const { isOpen, onClose, onToggle } = useDisclosure();
	const [scrollY, setScrollY] = useState(0);
	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	return (
		<Stack
			as="header"
			bgColor="brand"
			position="fixed"
			w="100%"
			zIndex={200}
		>
			<Stack
				as={motion.nav}
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				gap={5}
				mx={'75px'}
			>
				<NavigationBarElement />
				<Link href="/">
					<Logo />
				</Link>
				<Stack direction="row" gap={10} alignItems="center">
					<CategoryMenu />
					{links.map(({ path, children }) =>
						isSignedIn && path === '/signin' ? (
							<UserButton key={usrBtnId} afterSignOutUrl="/" />
						) : (
							<Link
								href={path}
								key={children}
								fontSize={14}
								textColor="second"
								_hover={{
									textDecoration: 'none',
								}}
							>
								{children}
							</Link>
						)
					)}
					<CartMenu />
					<FavoritesButton />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Navigation;
