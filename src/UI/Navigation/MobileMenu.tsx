import {
	Link as ChakraLink,
	Divider,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
type ModileMenuProps = {
	isOpen: boolean;
	onClose: () => void;
	links: { children: string; path: string }[];
};

const MobileMenu = ({ isOpen, onClose, links }: ModileMenuProps) => {
	const router = useRouter();
	const pathFromRoutes = router.query;
	return (
		<Drawer isOpen={isOpen} onClose={onClose}>
			<DrawerOverlay />
			<DrawerContent maxW={['70%', null]}>
				<DrawerCloseButton />
				<DrawerHeader>Меню</DrawerHeader>
				<DrawerBody>
					<Stack gap={2}>
						{links.map(({ children, path }) => (
							<ChakraLink
								as={Link}
								href={path}
								key={path}
								onClick={onClose}
								_hover={{ textDecoration: 'none' }}
								bgColor={
									`/profile/${
										pathFromRoutes.path as string
									}` === path ||
									`/admin/${
										pathFromRoutes.path as string
									}` === path
										? 'whiteAlpha.400'
										: ''
								}
							>
								{children}
							</ChakraLink>
						))}
						<Divider />
					</Stack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default MobileMenu;
