import { Stack, Text } from '@chakra-ui/react';
import { useCardOrderContext } from '~/context/ordersCardsContext';

const AdminOrderSum = () => {
	const { orderItem } = useCardOrderContext();
	return (
		<Stack direction="row" justifyContent="space-between">
			<Text>Итог:</Text>
			<Text fontWeight={600}>{orderItem.map((item) => item.price)}₽</Text>
		</Stack>
	);
};

export default AdminOrderSum;
