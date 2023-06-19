import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Highlight,
} from '@chakra-ui/react';
import type { OrderStatus } from '@prisma/client';
import { useRef } from 'react';
import { useCardOrderContext } from '~/context/ordersCardsContext';

const AdminAlertsStatus = () => {
	const { isOpen, onClose, handlChangeStatus, valueStatus, id } =
		useCardOrderContext();
	const cancelRef = useRef<HTMLButtonElement>(null);
	return (
		<AlertDialog
			leastDestructiveRef={cancelRef}
			isOpen={isOpen}
			onClose={onClose}
			motionPreset="slideInBottom"
			isCentered
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader>
						{valueStatus === 'COMPLETED'
							? 'Завершить заказ?'
							: 'Отменить Заказ?'}
					</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>
						<Highlight
							query={['завершен', 'отменён']}
							styles={{
								px: '2',
								py: '1',
								rounded: 'full',
								bg: `${
									valueStatus === 'COMPLETED'
										? 'green.400'
										: 'red.400'
								}`,
							}}
						>
							{valueStatus === 'COMPLETED'
								? 'Пожалуйста, подтвердите, что ваш заказ завершен'
								: 'Пожалуйста, потвердите, что ваш заказ отменён'}
						</Highlight>
					</AlertDialogBody>
					<AlertDialogFooter gap={5}>
						<Button
							onClick={() => {
								onClose();
								handlChangeStatus(
									valueStatus as OrderStatus,
									id
								);
							}}
							colorScheme={
								valueStatus === 'COMPLETED' ? 'green' : 'red'
							}
						>
							{valueStatus === 'COMPLETED'
								? 'Завершить'
								: 'Отменить'}
						</Button>
						<Button onClick={onClose}>Отмена</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export default AdminAlertsStatus;
