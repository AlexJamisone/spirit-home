import {
	Link as ChakraLink,
	Icon,
	IconButton,
	Stack,
	useDisclosure,
	useMediaQuery,
} from '@chakra-ui/react';
import { UserButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import Logo from '~/assets/Logo';
import { links } from '~/constants/links';
import CartMenu from '../Cart/CartMenu';
import Category from '../Category';
import MobileMenu from './MobileMenu';

const Navigation = () => {
	const { isSignedIn } = useAuth();
	const [isTablet] = useMediaQuery(['(max-width: 930px)']);
	const { isOpen, onClose, onToggle } = useDisclosure();

	if (isSignedIn) {
		links.splice(2, 1);
	}
	return (
		<Stack
			alignItems="center"
			direction="row"
			justifyContent={['center', 'space-between']}
			px={[null,'100px']}
			gap={2}
			as="nav"
			w={'100%'}
		>
			<ChakraLink as={Link} href="/" alignSelf="flex-start">
				<Logo size={isTablet ? 120 : 150} />
			</ChakraLink>
			<Stack direction="row" alignItems="center" gap={[1, 3, 5]}>
				<Category />
				{isTablet ? (
					<>
						<CartMenu />
						<IconButton
							variant="outline"
							aria-label="mobile-menu"
							icon={<Icon as={RxHamburgerMenu} boxSize={6} />}
							onClick={onToggle}
						/>
						<MobileMenu isOpen={isOpen} onClose={onClose} />
					</>
				) : (
					<>
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
						<CartMenu />
					</>
				)}
				{isTablet ? null : <UserButton />}
			</Stack>
		</Stack>
	);
};

export default Navigation;
