import { Icon, IconButton, Stack, Text, useToast } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { FiEye } from 'react-icons/fi';
import { useCardOrderContext } from '~/context/ordersCardsContext';
import { api } from '~/utils/api';
dayjs.locale('ru');

const AdminOrdersInfo = () => {
	const { address, user, createdAt, id, viewed } = useCardOrderContext();
	const toast = useToast();
	const { mutate: changeViewd, isLoading } =
		api.orders.changeViewd.useMutation();
	const ctx = api.useContext();
	const handlViewd = () => {
		changeViewd(
			{ id, viewed: !viewed },
			{
				onSuccess: () => {
					toast({
						description: 'Просмотрен',
						status: 'info',
						duration: 1000,
					});
					void ctx.orders.invalidate();
				},
			}
		);
	};
	return (
		<Stack fontSize={[14, 16]} position="relative">
			{viewed ? null : (
				<IconButton
					onClick={handlViewd}
					isLoading={isLoading}
					variant="solid"
					aria-label="viewed"
					icon={<Icon as={FiEye} />}
					position="absolute"
					right={0}
					as={motion.button}
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: {
							type: 'spring',
							duration: 0.4,
							delay: 0.2,
						},
					}}
					exit={{ opacity: 0 }}
				/>
			)}
			<Text fontWeight={600}>
				Дата cоздания: {dayjs(createdAt).format('DD.MM.YYYY HH:mm')}
			</Text>
			<Text>
				ФИО: {address.firstName} {address.lastName}
			</Text>
			<Text>Телефон: {address.contactPhone}</Text>
			<Text>{`Email: ${
				user?.email ? user.email : 'не зарегестрирован'
			}`}</Text>
			<Text>ПВЗ: {address.point?.addressFullName}</Text>
		</Stack>
	);
};

export default AdminOrdersInfo;
