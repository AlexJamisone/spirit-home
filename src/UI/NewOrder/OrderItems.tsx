import { Divider, Stack } from '@chakra-ui/react';
import TotalSum from '~/components/TotalSum';
import { useCart } from '~/stores/useCart';
import CartItem from '../Cart/CartItem';

type OrderItemsProps = {
	show: boolean;
};
const OrderItems = ({ show }: OrderItemsProps) => {
	const items = useCart((state) => state.items);
	return (
		<>
			{show && (
				<Stack gap={5}>
					<Stack>
						{items.map((item) => (
							<Stack
								key={item.id}
								boxShadow="lg"
								px={5}
								rounded={'2xl'}
								w="100%"
							>
								<CartItem item={item} />
							</Stack>
						))}
					</Stack>
					<Stack>
						<Divider />
						<TotalSum />
						<Divider />
					</Stack>
				</Stack>
			)}
		</>
	);
};
export default OrderItems;
