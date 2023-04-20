import {
	Center,
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
import dayjs from 'dayjs';
import { api } from '~/utils/api';

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
												<Text>
													{orderItem.reduce(
														(acc, current) => {
															const effectivePrice =
																current.product.priceHistory.find(
																	(history) =>
																		history.effectiveFrom <=
																		createdAt
																);
															const price =
																effectivePrice
																	? effectivePrice.price
																	: 0;
															return (
																acc +
																price *
																	current.quantity
															);
														},
														0
													)}
													₽
												</Text>
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
