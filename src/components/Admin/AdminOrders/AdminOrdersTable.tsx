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
import type { OrderItem, Product } from '@prisma/client';
import React from 'react';

type AdminOrdersTableProps = {
	orderItem: (OrderItem & {
		product: Product;
	})[];
};

const AdminOrdersTable = ({ orderItem }: AdminOrdersTableProps) => {
	return (
		<TableContainer
			overflowY="auto"
			overflowX="hidden"
			maxH={['300px']}
			sx={{
				'::-webkit-scrollbar': {
					width: '5px',
				},
				'::-webkit-scrollbar-track': {
					bgColor: 'gray.200',
				},
				'::-webkit-scrollbar-thumb': {
					borderRadius: '20px',
					backgroundColor: 'gray.500',
				},
			}}
		>
			<Table variant="simple">
				<TableCaption placement="top">Заказ</TableCaption>
				<Thead position="sticky" top={0} bg="white">
					<Tr>
						<Th>Позиция</Th>
						<Th>Кол-во</Th>
						<Th>Сумма</Th>
					</Tr>
				</Thead>
				<Tbody>
					{orderItem.map(
						({ product: { id, name, price }, quantity }) => (
							<Tr key={id}>
								<Td>{name}</Td>
								<Td>{quantity} шт.</Td>
								<Td>{price * quantity} ₽</Td>
							</Tr>
						)
					)}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default AdminOrdersTable;
