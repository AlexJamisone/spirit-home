import { Stack, Text } from '@chakra-ui/react';
import { useCart } from '~/stores/useCart';

const TotalSum = () => {
	const total = useCart((state) => state.total);
	return (
		<Stack direction="row" justifyContent="space-between" p={2}>
			<Text>Итог: </Text>
			<Text fontWeight={600}>{total} ₽</Text>
		</Stack>
	);
};
export default TotalSum;
