import {
	Radio,
	RadioGroup,
	Spinner,
	Stack,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import type { OrderStatus } from '@prisma/client';
import { useState } from 'react';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import NoData from '~/components/NoData/NoData';
import Overlay from '~/components/NoData/Overlay';
import { api } from '~/utils/api';
import AdminAlertsStatus from './AdminAlertsStatus';
import AdminOrdersInfo from './AdminOrdersInfo';
import AdminOrdersTable from './AdminOrdersTable';

const AdminOrders = () => {
	const { data: orders } = api.orders.get.useQuery();
	const { mutate: changeStatus, isLoading } =
		api.orders.changeStatus.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const { isOpen, onClose, onToggle } = useDisclosure();
	const [valueStatus, setValueStatus] = useState<'COMPLETED' | 'CANCELLED'>(
		'COMPLETED'
	);
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
	const checkOrderStatus = (status: OrderStatus) => {
		switch (status) {
			case 'PENDING':
				return 'teal.300';
			case 'PROCESSING':
				return 'green.600';
			case 'COMPLETED':
				return 'blue.300';
			case 'CANCELLED':
				return 'red.400';
			default:
				return '';
		}
	};
	return (
		<>
			{orders.length === 0 ? (
				<NoData
					icon={HiOutlineClipboardDocumentList}
					text="Пока что нет заказов"
				/>
			) : (
				orders.map((order) => {
					const { address, createdAt, orderItem, id, user, status } =
						order;
					return (
						<Stack
							key={id}
							w={['375px']}
							h={['600px', '665px']}
							direction={['column']}
							border={`2px solid`}
							borderColor={checkOrderStatus(status)}
							p={[3, 5]}
							mx={[5, null]}
							rounded="3xl"
							boxShadow="2xl"
							position="relative"
							cursor="pointer"
						>
							{status === 'COMPLETED' ||
							status === 'CANCELLED' ? (
								<Overlay />
							) : null}
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
									isDisabled={isLoading}
									onChange={(value) => {
										if (
											value === 'COMPLETED' ||
											value === 'CANCELLED'
										) {
											setValueStatus(value);
											onToggle();
										} else {
											handlChangeStatus(
												value as OrderStatus,
												id
											);
										}
									}}
									defaultValue={status}
									value={status}
									display="flex"
									flexDirection="column"
									justifyContent="flex-start"
								>
									<Radio colorScheme="teal" value="PENDING">
										В обработке
									</Radio>
									<Radio
										colorScheme="green"
										value="PROCESSING"
									>
										В пути
									</Radio>
									<Radio colorScheme="blue" value="COMPLETED">
										Доставлено
									</Radio>
									<Radio colorScheme="red" value="CANCELLED">
										Отменён
									</Radio>
								</RadioGroup>
								<AdminAlertsStatus
									isOpen={isOpen}
									onClose={onClose}
									handlChangeStatus={handlChangeStatus}
									id={id}
									value={valueStatus}
								/>
							</Stack>
						</Stack>
					);
				})
			)}
		</>
	);
};

export default AdminOrders;
