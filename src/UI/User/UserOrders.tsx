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
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { SiDatabricks } from 'react-icons/si';
import NoData from '~/components/NoData/NoData';
import { useUserMainContext } from '~/context/userMainContext';
import { status as statusHelper } from '~/helpers/status';

dayjs.locale('ru');

const UserOrders = () => {
	const { user } = useUserMainContext();
	return (
		<Stack
			as={motion.div}
			bgColor="whiteAlpha.900"
			boxShadow="2xl"
			h={[null, '550px']}
			rounded="2xl"
			px={[0, 3]}
		>
			{user.orders?.length === 0 ? (
				<NoData icon={SiDatabricks} text="Пока что нет заказов" />
			) : (
				<TableContainer maxW={['100vw']}>
					<Table size={['sm']}>
						<TableCaption placement="top">Заказы</TableCaption>
						<Thead>
							<Tr>
								<Th>Номер</Th>
								<Th>Дата заказа</Th>
								<Th>Статус</Th>
								<Th>Заказ</Th>
								<Th>Сумма</Th>
							</Tr>
						</Thead>
						{user.orders?.map(
							({
								id,
								createdAt,
								status,
								orderItem,
								orderNumber,
								viewed,
							}) => (
								<Tbody
									key={id}
									alignItems="center"
									justifyContent={['center', 'space-between']}
									px={[0, 5]}
								>
									<Tr>
										<Td>
											<Text textAlign="center">
												{orderNumber}
											</Text>
										</Td>
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
											<Stack direction="row">
												<Icon
													as={
														viewed
															? AiOutlineEye
															: AiOutlineEyeInvisible
													}
													boxSize={4}
												/>
												<Text>
													{viewed
														? 'Просмотренно'
														: 'Не просмотренно'}
												</Text>
											</Stack>
										</Td>
										<Td>
											{orderItem.map(
												({
													id,
													quantity,
													product: { name },
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
												{orderItem.map(
													(item) => item.price
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
	);
};

export default UserOrders;
