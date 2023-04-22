import { Stack, Text } from '@chakra-ui/react';
import type { Address, User } from '@prisma/client';
import dayjs from 'dayjs';
dayjs().locale('ru').format();

type AdminOrdersInfoProps = {
	user:
		| (User & {
				address: Address[];
		  })
		| null;
	address: Address;
	createdAt: Date;
};

const AdminOrdersInfo = ({
	address,
	user,
	createdAt,
}: AdminOrdersInfoProps) => {
	return (
		<Stack fontSize={[14,16]}>
			<Text fontWeight={600}>
				Дата cоздания: {dayjs(createdAt).format('DD.MM.YYYY HH:mm')}
				{}
			</Text>
			<Text>
				ФИО: {address.firstName} {address.lastName}
			</Text>
			<Text>Телефон: {address.contactPhone}</Text>
			<Text>Email: {user?.email}</Text>
			<Text>Город: {address.city}</Text>
			<Text>ПВЗ: {address.point}</Text>
		</Stack>
	);
};

export default AdminOrdersInfo;
