import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { Address, Order, OrderItem, Product } from '@prisma/client';
import dayjs from 'dayjs';
import OrderCardDitails from './OrderCardDitails';

dayjs().format();
type OrderCardProps = {
	order: Order & {
		address: Address | null;
		orderItem: (OrderItem & {
			product: Product;
		})[];
	};
};
const OrderCard = ({ order }: OrderCardProps) => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	return (
		<Card maxW={300}>
			<CardHeader textAlign={'center'}>
				Заказ №{order.orderNumber}
			</CardHeader>
			<CardBody as={Stack} gap={3}>
				<Text>
					Дата заказ:{' '}
					{dayjs(order.createdAt).format('DD.MM.YY HH:mm')}
				</Text>
				<Text>
					Зазачик: {order.address?.firstName}{' '}
					{order.address?.lastName}
				</Text>
				<Text>СДЭК: {order.address?.point}</Text>
				<Text>Телефон: {order.address?.contactPhone}</Text>
			</CardBody>
			<CardFooter as={Stack}>
				<Button onClick={onToggle} w={'full'}>
					Заказ
				</Button>
				<Stack direction={'row'} justifyContent={'space-between'}>
					<Text>Итог: </Text>
					<Text>{order.total} ₽</Text>
				</Stack>
				<OrderCardDitails
					orderNumber={order.orderNumber}
					onClose={onClose}
					isOpen={isOpen}
					orderItem={order.orderItem}
				/>
			</CardFooter>
		</Card>
	);
};
export default OrderCard;
