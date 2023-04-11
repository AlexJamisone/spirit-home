import { Avatar, Spinner, Stack, Text } from '@chakra-ui/react';
import { clerkClient } from '@clerk/nextjs/server';
import { api } from '~/utils/api';

const AdminOrders = () => {
	const { data: orders, isLoading } = api.orders.get.useQuery();
	if (!orders) return null;
	return (
		<Stack>
			{orders.length === 0 ? (
				<>Пока что нету заказов</>
			) : isLoading ? (
				<Spinner />
			) : (
				orders.map(
					({
						userId,
						status,
						createdAt,
						id,
						total,
						products,
						user,
					}) => (
						<Stack
							key={id}
							w={['300px']}
							h={['300px']}
							direction="column"
							border="1px solid #CBD5E0"
							p={5}
							rounded="3xl"
							boxShadow="2xl"
							position="relative"
						>
							<Text>{`ФИО: ${user.firstName ?? ''} ${
								user.lastName ?? ''
							}`}</Text>
							<Text>Email: {user.email}</Text>
							<Text>Телефон {user.address[0]?.contactPhone}</Text>
							<Text>CДЭК: {user.address[0]?.point}</Text>
							{products.map(({ id, product }) => (
								<Stack
									key={id}
									direction="row"
									justifyContent="space-between"
								>
									<Text>{product.name}</Text>
									<Text>{product.price}</Text>
								</Stack>
							))}
							<Text>{`Итог: ${products.reduce(
								(acc, { product }) => acc + product.price,
								0
							)}`}</Text>
						</Stack>
					)
				)
			)}
		</Stack>
	);
};

export default AdminOrders;
