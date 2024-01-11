import {
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import { OrderItem, Product } from '@prisma/client';

type OrderItemTableProps = {
	orderItem: (OrderItem & {
		product: Product;
	})[];
};
const OrderItemTable = ({ orderItem }: OrderItemTableProps) => {
	return (
		<TableContainer>
			<Table variant={'striped'}>
				<TableCaption>
					Итоговая сумма:{' '}
					{orderItem.reduce(
						(acc, current) =>
							acc + current.price * current.quantity,
						0
					)}{' '}
					₽
				</TableCaption>
				<Thead>
					<Th>Наимениование</Th>
					<Th>Размер</Th>
					<Th>Кол-во</Th>
					<Th>Итог</Th>
				</Thead>
				<Tbody>
					{orderItem.map((item) => (
						<Tr>
							<Td>{item.product.name}</Td>
							<Td>{item.size}</Td>
							<Td>{item.quantity}</Td>
							<Td>{item.price * item.quantity}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
export default OrderItemTable;
