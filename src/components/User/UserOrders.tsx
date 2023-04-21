import {
	Icon,
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
import { motion } from 'framer-motion';
import { SiDatabricks } from 'react-icons/si';
import { status as statusHelper } from '~/helpers/status';
import { api } from '~/utils/api';
import NoData from '../NoData/NoData';

dayjs().locale('ru').format();

const UserOrders = () => {
	const { data: user } = api.users.get.useQuery();
	if (!user) return null;
	return (
		<Stack
			as={motion.div}
			border={['none', '1px solid #CBD5E0']}
			w={['100%']}
			h={[null, '550px']}
			rounded="2xl"
			p={[0, 5]}
		>
			{user.orders?.length === 0 ? (
				<NoData icon={SiDatabricks} text='Пока что нет заказов'/>
			) : (
				<TableContainer maxW={['100vw']}>
					<Table size={['sm', 'md']}>
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
									justifyContent={['center', 'space-between']}
									px={[0, 5]}
								>
									<Tr>
										<Td>
											<Text>
												{dayjs(createdAt).format(
													'DD.MM.YYYY HH:mm'
												)}
											</Text>
										</Td>
										<Td>
											<Stack
												direction="row"
												alignItems="center"
											>
												<Icon
													as={
														statusHelper(status)
															?.icon
													}
													boxSize={4}
													textColor={
														statusHelper(status)
															?.color
													}
												/>
												<Text>
													{statusHelper(status)?.text}
												</Text>
											</Stack>
										</Td>
										<Td>
											{orderItem.map(
												({
													id,
													product: { name },
													quantity,
												}) => (
													<Stack
														key={id}
														direction="column"
													>
														<Text>
															{name} x{quantity}
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
												)}{' '}
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
	);
};

export default UserOrders;
