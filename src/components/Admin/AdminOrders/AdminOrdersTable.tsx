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
import type { OrderItem, Product, ProductPriceHistory } from '@prisma/client';
import React from 'react';

type AdminOrdersTableProps = {
	orderItem: (OrderItem & {
		product: Product & {
			priceHistory: ProductPriceHistory[];
		};
	})[];
	createdAt: Date;
};

const AdminOrdersTable = ({ orderItem, createdAt }: AdminOrdersTableProps) => {
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
						({ product: { id, name, priceHistory }, quantity }) => (
							<Tr key={id}>
								<Td>{name}</Td>
								<Td>{quantity} шт.</Td>
								<Td>
									{(priceHistory.find(
										(history) =>
											history.effectiveFrom <= createdAt
									)?.price ?? 0) * quantity}
								</Td>
							</Tr>
						)
					)}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default AdminOrdersTable;
