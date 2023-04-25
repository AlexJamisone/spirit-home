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

type AdminAlertsStatusProps = {
	isOpen: boolean;
	onClose: () => void;
	handlChangeStatus: (value: OrderStatus, id: string) => void;
	value: 'COMPLETED' | 'CANCELLED';
	id: string;
};

const AdminAlertsStatus = ({
	isOpen,
	onClose,
	value,
	handlChangeStatus,
	id,
}: AdminAlertsStatusProps) => {
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
						{value === 'COMPLETED'
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
									value === 'COMPLETED'
										? 'green.400'
										: 'red.400'
								}`,
							}}
						>
							{value === 'COMPLETED'
								? 'Пожалуйста, подтвердите, что ваш заказ завершен'
								: 'Пожалуйста, потвердите, что ваш заказ отменён'}
						</Highlight>
					</AlertDialogBody>
					<AlertDialogFooter gap={5}>
						<Button
							onClick={() => {
								onClose();
								handlChangeStatus(value as OrderStatus, id);
							}}
							colorScheme={
								value === 'COMPLETED' ? 'green' : 'red'
							}
						>
							{value === 'COMPLETED' ? 'Завершить' : 'Отменить'}
						</Button>
						<Button onClick={onClose}>Отмена</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export default AdminAlertsStatus;
