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
import {
	createContext,
	useContext,
	type Dispatch,
	type SetStateAction,
} from 'react';

interface CardOrderContext {
	address: Address & {
		point: Point | null;
	};
	user:
		| (User & {
				address: Address[];
		  })
		| null;
	orderItem: (OrderItem & {
		product: Product & {
			priceHistory: ProductPriceHistory[];
			quantity: (Quantity & {
				size: Size;
			})[];
		};
	})[];
	checkOrderStatus: (
		status: OrderStatus
	) => '' | 'teal.300' | 'green.600' | 'blue.300' | 'red.400';
	valueStatus: 'COMPLETED' | 'CANCELLED';
	status: OrderStatus;
	isLoading: boolean;
	isOpen: boolean;
	onClose: () => void;
	onToggle: () => void;
	handlChangeStatus: (value: OrderStatus, id: string) => void;
	setValueStatus: Dispatch<SetStateAction<'COMPLETED' | 'CANCELLED'>>;
	id: string;
	createdAt: Date;
	viewed: boolean;
	orderNumber: number;
}

const CardOrderContext = createContext<CardOrderContext | null>(null);

export function useCardOrderContext() {
	const context = useContext(CardOrderContext);
	if (!context)
		throw new Error(
			'CardOrder.* component must be render as a child of CardOrder comopnent'
		);
	return context;
}

export default CardOrderContext;
