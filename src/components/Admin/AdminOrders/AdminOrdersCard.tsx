import { Stack, useDisclosure, useToast } from '@chakra-ui/react';
import type {
	Address,
	OrderItem,
	OrderStatus,
	Point,
	Product,
	ProductPriceHistory,
	Quantity,
	Size,
	User,
} from '@prisma/client';
import { motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import Overlay from '~/components/NoData/Overlay';
import CardOrderContext from '~/context/ordersCardsContext';
import { api } from '~/utils/api';
import AdminChangeStatus from './AdminChangeStatus';
import AdminOrderSum from './AdminOrderSum';
import AdminOrdersInfo from './AdminOrdersInfo';
import AdminOrdersTable from './AdminOrdersTable';

type AdminOrdersCardProps = {
	order: {
		user:
			| (User & {
					address: Address[];
			  })
			| null;
		address: Address & {
			point: Point | null;
		};
		orderItem: (OrderItem & {
			product: Product & {
				priceHistory: ProductPriceHistory[];
				quantity: (Quantity & {
					size: Size;
				})[];
			};
		})[];
		id: string;
		userId: string | null;
		status: OrderStatus;
		createdAt: Date;
		viewed: boolean;
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
	const { address, createdAt, id, orderItem, status, user, viewed } = order;

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
				viewed,
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
				as={motion.div}
				layout
				initial={{ opacity: 0 }}
				animate={{
					opacity: 1,
					transition: { type: 'spring', duration: 0.3 },
				}}
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

AdminOrdersCard.Info = AdminOrdersInfo;
AdminOrdersCard.Table = AdminOrdersTable;
AdminOrdersCard.Sum = AdminOrderSum;
AdminOrdersCard.Status = AdminChangeStatus;

export default AdminOrdersCard;
