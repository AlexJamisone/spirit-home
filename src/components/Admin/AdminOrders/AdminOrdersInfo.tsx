import { Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useCardOrderContext } from '~/context/ordersCardsContext';
dayjs().locale('ru').format();

const AdminOrdersInfo = () => {
	const { address, user, createdAt } = useCardOrderContext();
	return (
		<Stack fontSize={[14, 16]}>
			<Text fontWeight={600}>
				Дата cоздания: {dayjs(createdAt).format('DD.MM.YYYY HH:mm')}
			</Text>
			<Text>
				ФИО: {address.firstName} {address.lastName}
			</Text>
			<Text>Телефон: {address.contactPhone}</Text>
			<Text>{`Email: ${
				user?.email ? user.email : 'не зарегестрирован'
			}`}</Text>
			<Text>Город: {address.city}</Text>
			<Text>ПВЗ: {address.point}</Text>
		</Stack>
	);
};

export default AdminOrdersInfo;
