import { Radio, RadioGroup, Spinner, Stack, Text } from '@chakra-ui/react';
import type { OrderStatus } from '@prisma/client';
import { useCardOrderContext } from '~/context/ordersCardsContext';
import AdminAlertsStatus from './AdminAlertsStatus';



const AdminChangeStatus = () => {
	const { isLoading, onToggle, setValueStatus, handlChangeStatus, status, id } =
		useCardOrderContext();
	return (
		<>
			<Stack direction="row" justifyContent="center" alignItems="center">
				<Text textAlign="center">Статус</Text>
				{isLoading ? <Spinner size="sm" /> : null}
			</Stack>
			<RadioGroup
				isDisabled={isLoading}
				onChange={(value) => {
					if (value === 'COMPLETED' || value === 'CANCELLED') {
						setValueStatus(value);
						onToggle();
					} else {
						handlChangeStatus(value as OrderStatus, id);
					}
				}}
				defaultValue={status}
				value={status}
				display="flex"
				flexDirection="column"
				justifyContent="flex-start"
			>
				<Radio colorScheme="teal" value="PENDING">
					В обработке
				</Radio>
				<Radio colorScheme="green" value="PROCESSING">
					В пути
				</Radio>
				<Radio colorScheme="blue" value="COMPLETED">
					Доставлено
				</Radio>
				<Radio colorScheme="red" value="CANCELLED">
					Отменён
				</Radio>
			</RadioGroup>
			<AdminAlertsStatus />
		</>
	);
};

export default AdminChangeStatus;
