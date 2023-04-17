import {
	Radio,
	RadioGroup,
	Stack,
	Table,
	TableCaption,
	TableContainer,
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
import AdminOrdersTable from './AdminOrdersTable';
import AdminOrdersInfo from './AdminOrdersInfo';

const AdminOrders = () => {
	const { data: orders } = api.orders.get.useQuery();
	const [statusState, setStatusState] = useState<OrderStatus>('PENDING');
	if (!orders) return null;
	return (
		<Stack direction="row" gap={5}>
			{orders.length === 0 ? (
				<>Пока что нету заказов</>
			) : (
				orders.map((order) => {
					const { address, createdAt, orderItem, id, user } = order;
					return (
						<Stack
							key={id}
							w={['100%']}
							maxH={['665px']}
							direction="column"
							border="1px solid #CBD5E0"
							p={5}
							rounded="3xl"
							boxShadow="2xl"
							position="relative"
							cursor="pointer"
						>
							<AdminOrdersInfo address={address} user={user} createdAt={createdAt}/>
							<AdminOrdersTable orderItem={orderItem} />
							<Stack
								direction="row"
								justifyContent="space-between"
							>
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
							<Stack
								justifyContent="center"
								alignContent="center"
							>
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
					);
				})
			)}
		</Stack>
	);
};

export default AdminOrders;
