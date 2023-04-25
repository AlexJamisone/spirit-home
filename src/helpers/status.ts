import type { OrderStatus } from '@prisma/client';
import type { IconType } from 'react-icons';
import { IoCheckmark } from 'react-icons/io5';
import { TbRotateDot, TbTruckDelivery } from 'react-icons/tb';
import { TiCancel } from 'react-icons/ti';
export function status(
	status: OrderStatus
): { icon: IconType; text: string; color: string } | undefined {
	switch (status) {
		case 'PENDING':
			return {
				icon: TbRotateDot,
				text: 'В обработке',
				color: 'green.300',
			};
		case 'PROCESSING':
			return {
				icon: TbTruckDelivery,
				text: 'В пути',
				color: 'blue.300',
			};
		case 'COMPLETED':
			return {
				icon: IoCheckmark,
				text: 'Доставленно',
				color: 'teal.300',
			};
		case 'CANCELLED':
			return {
				icon: TiCancel,
				text: 'Отменено',
				color: 'red.400',
			};
		default:
			undefined;
	}
}
