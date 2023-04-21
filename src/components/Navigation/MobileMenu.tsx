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
import { links } from '~/constants/links';
import { menuItems } from '~/constants/menuItem';
import { api } from '~/utils/api';
type ModileMenuProps = {
	isOpen: boolean;
	onClose: () => void;
};

const MobileMenu = ({ isOpen, onClose }: ModileMenuProps) => {
	const { data: user } = api.users.get.useQuery();
	const router = useRouter();
	const pathFromRoutes = router.query;
	if (!user) return null;
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
						{menuItems
							.filter(({ type }) => user.role === type)
							.map(({ path, title }) => (
								<ChakraLink
									href={path}
									key={path}
									as={Link}
									_hover={{ textDecoration: 'none' }}
									onClick={onClose}
								>
									{title}
								</ChakraLink>
							))}
					</Stack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default MobileMenu;
