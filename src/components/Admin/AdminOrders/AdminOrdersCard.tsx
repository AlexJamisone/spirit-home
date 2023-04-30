import { Stack, useDisclosure, useToast } from '@chakra-ui/react';
import type {
	Address,
	OrderItem,
	OrderStatus,
	Product,
	ProductPriceHistory,
	User,
} from '@prisma/client';
import { useState, type ReactNode } from 'react';
import Overlay from '~/components/NoData/Overlay';
import CardOrderContext from '~/context/ordersCardsContext';
import { api } from '~/utils/api';

type AdminOrdersCardProps = {
	order: {
		user:
			| (User & {
					address: Address[];
			  })
			| null;
		address: Address;
		orderItem: (OrderItem & {
			product: Product & {
				priceHistory: ProductPriceHistory[];
			};
		})[];
		id: string;
		userId: string | null;
		status: OrderStatus;
		createdAt: Date;
	};
	info?: ReactNode;
	table?: ReactNode;
	sum?: ReactNode;
	statusComp?: ReactNode;
};

const AdminOrdersCard = ({
	info,
	order,
	statusComp,
	sum,
	table,
}: AdminOrdersCardProps) => {
	const { mutate: changeStatus, isLoading } =
		api.orders.changeStatus.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const { isOpen, onClose, onToggle } = useDisclosure();
	const [valueStatus, setValueStatus] = useState<'COMPLETED' | 'CANCELLED'>(
		'COMPLETED'
	);
	const { address, createdAt, id, orderItem, status, user } = order;

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
		<CardOrderContext.Provider
			value={{
				checkOrderStatus,
				valueStatus,
				isLoading,
				isOpen,
				onClose,
				onToggle,
				handlChangeStatus,
				setValueStatus,
				user,
				address,
				orderItem,
				createdAt,
				status,
				id,
			}}
		>
			<Stack
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
				{status === 'COMPLETED' || status === 'CANCELLED' ? (
					<Overlay />
				) : null}
				{info}
				{table}
				{sum}
				<Stack justifyContent="center" alignContent="center">
					{statusComp}
				</Stack>
			</Stack>
		</CardOrderContext.Provider>
	);
};

export default AdminOrdersCard;
