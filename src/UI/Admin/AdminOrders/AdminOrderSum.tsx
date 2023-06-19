import { Stack, Text } from '@chakra-ui/react';
import { useCardOrderContext } from '~/context/ordersCardsContext';

const AdminOrderSum = () => {
	const { orderItem, createdAt } = useCardOrderContext();
	return (
		<Stack direction="row" justifyContent="space-between">
			<Text>Итог:</Text>
			<Text fontWeight={600}>
				{orderItem.reduce((acc, current) => {
					const effectivePrice = current.product.priceHistory.find(
						(history) => history.effectiveFrom <= createdAt
					);
					const price = effectivePrice ? effectivePrice.price : 0;
					return acc + price * current.quantity;
				}, 0)}
				₽
			</Text>
		</Stack>
	);
};

export default AdminOrderSum;
