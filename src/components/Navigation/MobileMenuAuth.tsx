/* eslint-disable @typescript-eslint/no-misused-promises */
import {
	Link as ChakraLink,
	Divider,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Icon,
	IconButton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
	MdOutlineNotificationsActive,
	MdOutlineNotificationsOff,
} from 'react-icons/md';
import { menuItems } from '~/constants/menuItem';
import { api } from '~/utils/api';

type ModileMenuAuthProps = {
	isOpen: boolean;
	onClose: () => void;
	links: { children: string; path: string }[];
};

const MobileMenuAuth = ({ isOpen, onClose, links }: ModileMenuAuthProps) => {
	const { data: user } = api.users.get.useQuery();
	const [notificationEnabled, setNotificationEnabled] = useState(false);
	const router = useRouter();
	const pathFromRoutes = router.query;

	const enebelNotification = async () => {
		setNotificationEnabled(true);
		if (Notification.permission !== 'granted') {
			const permission = await Notification.requestPermission();
			if (permission === 'granted') {
				new Notification('Уведомления успешно включены ✔');
			}
		} else {
			setNotificationEnabled(false);
		}
	};

	return (
		<Drawer isOpen={isOpen} onClose={onClose}>
			<DrawerOverlay />
			<DrawerContent maxW={['70%', null]}>
				<DrawerCloseButton />
				<DrawerHeader>
					<Stack direction="row" gap={5}>
						<Text>Меню</Text>
						{user?.role === 'ADMIN' ? (
							<IconButton
								size="sm"
								variant="outline"
								aria-label="notification"
								onClick={enebelNotification}
								icon={
									<Icon
										as={
											notificationEnabled
												? MdOutlineNotificationsActive
												: MdOutlineNotificationsOff
										}
										boxSize={5}
									/>
								}
							/>
						) : null}
					</Stack>
				</DrawerHeader>
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
						{user ? (
							<Stack gap={3} alignItems="flex-start">
								{menuItems
									.filter(({ type }) => user.role === type)
									.map(({ path, title }) => (
										<ChakraLink
											href={path}
											key={path}
											as={Link}
											_hover={{
												textDecoration: 'none',
											}}
											onClick={onClose}
										>
											{title}
										</ChakraLink>
									))}
								<SignOutButton>Выход</SignOutButton>
							</Stack>
						) : null}
					</Stack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default MobileMenuAuth;
