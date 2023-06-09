import { Link } from '@chakra-ui/next-js';
import {
	Icon,
	IconButton,
	Stack,
	useDisclosure,
	useMediaQuery,
} from '@chakra-ui/react';
import { UserButton, useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import Logo from '~/assets/Logo';
import { links } from '~/constants/links';
import CartMenu from '../Cart/CartMenu';
import CategoryMenu from '../Category/CategoryMenu';
import MobileMenu from './MobileMenu';
import MobileMenuAuth from './MobileMenuAuth';

const Navigation = () => {
	const { isSignedIn } = useAuth();
	const [isTablet] = useMediaQuery(['(max-width: 930px)']);
	const { isOpen, onClose, onToggle } = useDisclosure();
	const [renderLinks, setRenderLinks] = useState(links);
	const [bgColor, setBgColor] = useState(false);
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY >= 50 || window.scrollY >= 50) {
				setBgColor(true);
			} else {
				setBgColor(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	useEffect(() => {
		const linksCopy = [...links];
		if (isSignedIn) {
			linksCopy.splice(2, 1);
		}
		setRenderLinks(linksCopy);
	}, [isSignedIn]);
	return (
		<Stack
			alignItems="center"
			direction="row"
			justifyContent={['center', 'space-between']}
			px={[null, '100px']}
			gap={2}
			as={motion.nav}
			initial={{ opacity: 0, filter: 'blur(5px)' }}
			animate={{
				opacity: 1,
				filter: 'blur(0px)',
				transition: {
					type: 'tween',
					duration: 1,
				},
			}}
			w={'100%'}
			position="fixed"
			zIndex={5}
			background={bgColor ? 'whiteAlpha.300' : ''}
			backdropFilter={bgColor ? 'blur(4px)' : ''}
		>
			<Link href="/" alignSelf="flex-start">
				<Logo size={isTablet ? 120 : 150} />
			</Link>
			<Stack direction="row" alignItems="center" gap={[1, 3, 5]}>
				<CategoryMenu />
				{isTablet ? (
					<>
						<CartMenu />
						<IconButton
							variant="outline"
							aria-label="mobile-menu"
							icon={<Icon as={RxHamburgerMenu} boxSize={6} />}
							onClick={onToggle}
						/>
						{isSignedIn ? (
							<MobileMenuAuth
								links={renderLinks}
								isOpen={isOpen}
								onClose={onClose}
							/>
						) : (
							<MobileMenu
								links={renderLinks}
								isOpen={isOpen}
								onClose={onClose}
							/>
						)}
					</>
				) : (
					<>
						{renderLinks.map(({ children, path }) => (
							<Link
								href={path}
								key={path}
								_hover={{
									textDecoration: 'none',
								}}
							>
								{children}
							</Link>
						))}
						<CartMenu />
					</>
				)}
				{isTablet ? null : <UserButton afterSignOutUrl="/signin" />}
			</Stack>
		</Stack>
	);
};

export default Navigation;
