import { Spinner, Stack, Text, RadioGroup, Radio } from '@chakra-ui/react';
import { api } from '~/utils/api';
import { useState } from 'react';
import type { OrderStatus } from '@prisma/client';
const AdminOrders = () => {
	const { data: orders } = api.orders.get.useQuery();
	const [statusState, setStatusState] = useState<OrderStatus>('PENDING');
	if (!orders) return null;
	return (
		<Stack direction="row" gap={5}>
			{orders.length === 0 ? (
				<>Пока что нету заказов</>
			) : (
				orders.map(
					({ id, products, user }) => (
						<Stack
							key={id}
							w={['300px']}
							h={['400px']}
							direction="column"
							border="1px solid #CBD5E0"
							p={5}
							rounded="3xl"
							boxShadow="2xl"
							position="relative"
							cursor="pointer"
						>
							<Text>
								ФИО: {user?.firstName} {user?.lastName}
							</Text>
							<Text>Email: {user?.email}</Text>
							<Text>
								Телефон {user?.address[0]?.contactPhone}
							</Text>
							<Text>CДЭК: {user?.address[0]?.point}</Text>
							{products.map(({ id, name, price }) => (
								<Stack
									key={id}
									direction="row"
									justifyContent="space-between"
								>
									<Text>{name}</Text>
									<Text>{price}</Text>
								</Stack>
							))}
							<Text>{`Итог: ${products.reduce(
								(acc, { price }) => acc + price,
								0
							)}`}</Text>
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
					)
				)
			)}
		</Stack>
	);
};

export default AdminOrders;
