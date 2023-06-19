import { Icon, IconButton, useToast } from '@chakra-ui/react';
import { MdNotificationsActive } from 'react-icons/md';

const AdminNotificationButton = () => {
	const toast = useToast();
	const handlClick = async () => {
		const permission = await Notification.requestPermission();
		if (permission === 'granted') {
			new Notification('Уведомления успешно включены!');
		} else {
			toast({
				description: 'Вы запретили уведомления ;(',
				status: 'error',
				isClosable: true,
			});
		}
	};
	return (
		<IconButton
			aria-label="notification-button"
			icon={
				<Icon as={MdNotificationsActive} boxSize={6} fill="pink.300" />
			}
			variant="outline"
			onClick={() => {
				void handlClick();
			}}
		/>
	);
};

export default AdminNotificationButton;
