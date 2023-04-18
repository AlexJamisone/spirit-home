import {
	Center,
	Stack,
	Text,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
} from '@chakra-ui/react';
import { api } from '~/utils/api';
import dayjs from 'dayjs';
dayjs().locale('ru').format();

const UserOrders = () => {
	const { data: user } = api.users.get.useQuery();
	if (!user) return null;
	return (
		<Center>
			<Stack
				border="1px solid #CBD5E0"
				w={['100%']}
				h="550px"
				rounded="2xl"
				p={5}
			>
				{user.orders?.length === 0 ? (
					<Text textAlign="center">Пока что нету заказов</Text>
				) : (
					<TableContainer>
						<Table>
							<TableCaption placement="top">Заказы</TableCaption>
							<Thead>
								<Tr>
									<Th>Дата заказа</Th>
									<Th>Статус</Th>
									<Th>Заказ</Th>
									<Th>Сумма</Th>
								</Tr>
							</Thead>
							{user.orders?.map(
								({ id, createdAt, status, orderItem }) => (
									<Tbody
										key={id}
										alignItems="center"
										justifyContent="space-between"
										px={5}
									>
										<Tr>
											<Td>
												{dayjs(createdAt).format(
													'DD.MM.YYYY HH:mm'
												)}
											</Td>
											<Td>{status}</Td>
											<Td fontSize={12}>
												{orderItem.map(
													({
														id,
														product: {
															name,
															priceHistory,
														},
														quantity,
													}) => (
														<Stack
															key={id}
															direction="column"
														>
															<Text>
																{name} x
																{quantity}
															</Text>
														</Stack>
													)
												)}
											</Td>
											<Td>
												{orderItem.reduce(
													(acc, current) => {
														const {
															quantity,
															product,
														} = current;
														const price = product
															.priceHistory[0]
															?.price as number;
														const itemTotal =
															quantity * price;
														return acc + itemTotal;
													},
													0
												)}
											</Td>
										</Tr>
									</Tbody>
								)
							)}
						</Table>
					</TableContainer>
				)}
			</Stack>
		</Center>
	);
};

export default UserOrders;
