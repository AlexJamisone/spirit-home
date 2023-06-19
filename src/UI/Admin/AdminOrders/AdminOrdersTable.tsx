import {
	Table,
	TableCaption,
	TableContainer,
	Tag,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tooltip,
	Tr,
} from '@chakra-ui/react';
import { useCardOrderContext } from '~/context/ordersCardsContext';

const AdminOrdersTable = () => {
	const { orderItem, createdAt } = useCardOrderContext();
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
					<Tr fontSize={[10]}>
						<Th>
							<Text fontSize={10}>Позиция</Text>
						</Th>
						<Th>
							<Text fontSize={10}>Кол-во</Text>
						</Th>
						<Th>
							<Text fontSize={10}>Размер</Text>
						</Th>
					</Tr>
				</Thead>
				<Tbody>
					{orderItem.map(
						({
							product: { name, priceHistory, quantity: qt },
							quantity,
							id,
							selectedQtId,
						}) => (
							<Tr key={id}>
								<Td textAlign="left">
									<Tooltip
										label={`${
											(priceHistory.find(
												(history) =>
													history.effectiveFrom <=
													createdAt
											)?.price ?? 0) * quantity
										} ₽`}
									>
										{name}
									</Tooltip>
								</Td>
								<Td>{quantity} шт.</Td>
								<Td>
									{qt
										.filter(
											(quantity) =>
												quantity.id === selectedQtId
										)
										.map(({ size }) => (
											<Tag key={selectedQtId}>
												{size.size}
											</Tag>
										))}
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
