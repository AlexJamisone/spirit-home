import { useEffect, useState } from 'react';
import { pusherFront } from '~/lib/pusherFront';
export type NotificationProps = {
	name: string;
	city: string;
};
//make this better
const AdminNotification = () => {
	const [notification, setNotification] = useState<
		NotificationProps | undefined
	>(undefined);
	const channel = pusherFront.subscribe('order');
	channel.bind('new-order', (payload: NotificationProps) => {
		setNotification(payload);
	});
	useEffect(() => {
		if (Notification.permission === 'granted' && notification) {
			new Notification(`Новый заказ от ${notification.name}`, {
				body: `В город ${notification.city} `,
			});
		}
	}, [notification]);
	return <></>;
};

export default AdminNotification;
