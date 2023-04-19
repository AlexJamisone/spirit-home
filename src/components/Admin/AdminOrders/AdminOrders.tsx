import {
	Radio,
	RadioGroup,
	Spinner,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react';
import type { OrderStatus } from '@prisma/client';
import { api } from '~/utils/api';
import AdminOrdersInfo from './AdminOrdersInfo';
import AdminOrdersTable from './AdminOrdersTable';

const AdminOrders = () => {
	const { data: orders } = api.orders.get.useQuery();
	const { mutate: changeStatus, isLoading } =
		api.orders.changeStatus.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	if (!orders) return null;

	const handlChangeStatus = (value: OrderStatus, id: string) => {
		changeStatus(
			{
				status: value,
				id,
			},
			{
				onSuccess: () => {
					toast({
						description: `Статус изменён!✌`,
						status: 'info',
						isClosable: true,
					});
					void ctx.orders.invalidate();
				},
			}
		);
	};
	return (
		<Stack direction="row" gap={5}>
			{orders.length === 0 ? (
				<>Пока что нету заказов</>
			) : (
				orders.map((order) => {
					const { address, createdAt, orderItem, id, user, status } =
						order;
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
							<AdminOrdersInfo
								address={address}
								user={user}
								createdAt={createdAt}
							/>
							<AdminOrdersTable
								orderItem={orderItem}
								createdAt={createdAt}
							/>
							<Stack
								direction="row"
								justifyContent="space-between"
							>
								<Text>Итог:</Text>
								<Text fontWeight={600}>
									{orderItem.reduce((acc, current) => {
										const effectivePrice =
											current.product.priceHistory.find(
												(history) =>
													history.effectiveFrom <=
													createdAt
											);
										const price = effectivePrice
											? effectivePrice.price
											: 0;
										return acc + price * current.quantity;
									}, 0)}
									₽
								</Text>
							</Stack>
							<Stack
								justifyContent="center"
								alignContent="center"
							>
								<Stack
									direction="row"
									justifyContent="center"
									alignItems="center"
								>
									<Text textAlign="center">Статус</Text>
									{isLoading ? (
										<Spinner size="sm" key={id} />
									) : null}
								</Stack>
								<RadioGroup
									onChange={(value) =>
										handlChangeStatus(
											value as OrderStatus,
											id
										)
									}
									defaultValue={status}
									value={status}
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
