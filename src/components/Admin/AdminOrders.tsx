import {
	Radio,
	RadioGroup,
	Stack,
	Table,
	TableCaption,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import type { OrderStatus } from '@prisma/client';
import { useState } from 'react';
import { api } from '~/utils/api';
import dayjs from 'dayjs';
dayjs().locale('ru').format();

const AdminOrders = () => {
	const { data: orders } = api.orders.get.useQuery();
	const [statusState, setStatusState] = useState<OrderStatus>('PENDING');
	if (!orders) return null;
	return (
		<Stack direction="row" gap={5}>
			{orders.length === 0 ? (
				<>Пока что нету заказов</>
			) : (
				orders.map(({ id, orderItem, user, address, createdAt }) => (
					<Stack
						key={id}
						w={['100%']}
						h={['100%']}
						direction="column"
						border="1px solid #CBD5E0"
						p={5}
						rounded="3xl"
						boxShadow="2xl"
						position="relative"
						cursor="pointer"
					>
						<Stack>
							<Text fontWeight={600}>
								Дата cоздания:{' '}
								{dayjs(createdAt).format('DD.MM.YYYY HH:mm')}
								{}
							</Text>
							<Text>
								ФИО: {user?.firstName} {user?.lastName}
							</Text>
							<Text>Телефон: {address.contactPhone}</Text>
							<Text>Email: {user?.email}</Text>
							<Text>Город: {address.city}</Text>
							<Text>ПВЗ: {address.point}</Text>
						</Stack>
						<Table variant="simple">
							<TableCaption placement="top">Заказ</TableCaption>
							<Thead>
								<Tr>
									<Th>Позиция</Th>
									<Th>Кол-во</Th>
									<Th>Сумма</Th>
								</Tr>
							</Thead>
							<Tbody>
								{orderItem.map(
									({
										product: { id, name, price },
										quantity,
									}) => (
										<Tr key={id}>
											<Td>{name}</Td>
											<Td>{quantity} шт.</Td>
											<Td>{price * quantity} ₽</Td>
										</Tr>
									)
								)}
							</Tbody>
						</Table>
						<Stack direction="row" justifyContent="space-between">
							<Text>Итог:</Text>
							<Text fontWeight={600}>
								{orderItem.reduce(
									(acc, current) =>
										acc +
										current.product.price *
											current.quantity,
									0
								)}{' '}
								₽
							</Text>
						</Stack>
						<Stack justifyContent="center" alignContent="center">
							<Text textAlign="center">Статус</Text>
							<RadioGroup
								onChange={(value) =>
									setStatusState(value as OrderStatus)
								}
								value={statusState}
								display="flex"
								flexDirection="column"
							>
								<Radio value="PENDING">В обработке</Radio>
								<Radio value="PROCESSING">В пути</Radio>
								<Radio value="COMPLETED">Доставлено</Radio>
								<Radio value="CANCELLED">Отменён</Radio>
							</RadioGroup>
						</Stack>
					</Stack>
				))
			)}
		</Stack>
	);
};

export default AdminOrders;
