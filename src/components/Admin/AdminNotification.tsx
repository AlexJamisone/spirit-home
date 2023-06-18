import { useEffect, useState } from 'react';
import { pusherFront } from '~/lib/pusherFront';
export type NotificationProps = {
	name: string;
	city: string;
	sum: number;
};

const AdminNotification = () => {
	const [notification, setNotification] = useState<NotificationProps>({
		city: '',
		name: '',
		sum: 0,
	});
	const channel = pusherFront.subscribe('order');
	channel.bind('new-order', (payload: NotificationProps) => {
		setNotification(payload);
	});
	useEffect(() => {
		if (Notification.permission === 'granted') {
			new Notification(`Новый заказ от ${notification.name}`, {
				body: `В город ${notification.city} `,
				tag: `На сумму ${notification.sum}`,
			});
		}
	}, [notification]);
};

export default AdminNotification;
