import { Link } from '@chakra-ui/next-js';
import {
	Box,
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
	useEffect(() => {
		const linksCopy = [...links];
		if (isSignedIn) {
			linksCopy.splice(2, 1);
		}
		setRenderLinks(linksCopy);
	}, [isSignedIn]);
	return (
		<Stack
			roundedBottom="50px"
			alignItems="center"
			direction="row"
			justifyContent={['center', 'space-between']}
			px={[null, '100px']}
			gap={5}
			as={motion.nav}
			bgColor="brand"
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
			zIndex={200}
		>
			<Box
				as={motion.div}
				position="absolute"
				left={'50%'}
				w="96%"
				h="140%"
				transform="translateX(-50%)"
				border="2px solid"
				borderColor="second"
				roundedBottom="50px"
				top={''}
				animate={{
					top: scrollY < 20 ? undefined : `-${scrollY}px`,
					opacity: scrollY > 100 ? 0 : 1,
					transition: {
						duration: 1,
						damping: 300,
					},
				}}
			/>
			<Link
				href="/"
				alignSelf="flex-start"
				cursor="pointer"
				position="relative"
			>
				<Logo size={isTablet ? 120 : 150} color="second" />
			</Link>
			<Stack direction="row" alignItems="center" gap={[1, 3, 9]}>
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
								textColor="second"
								position="relative"
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
