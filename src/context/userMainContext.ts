import type {
	Address,
	Category,
	Order,
	OrderItem,
	Point,
	Product,
	ProductPriceHistory,
	Role,
} from '@prisma/client';
import {
	createContext,
	useContext,
	type ChangeEvent,
	type Dispatch,
	type RefObject,
} from 'react';
import type { AddressSuggestions } from 'react-dadata';
import type { Action, InputAddressState } from '~/reducer/InputAddressReducer';

interface UserMainContextProps {
	user: {
		id: string;
		role?: Role;
		username: string | null;
		profileImageUrl: string;
		createdAt: number;
		email: string | undefined;
		firstName: string | null;
		lastName: string | null;
		address?: (Address & { point: Point | null })[];
		orders?: (Order & {
			orderItem: (OrderItem & {
				product: Product & {
					priceHistory: ProductPriceHistory[];
				};
			})[];
		})[];
		categories?: Category[];
	};
	handlAvatar: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
	handlEdit: (
		address: Address & {
			point: Point | null;
		}
	) => void;
	handlAdd: () => void;
	handlDeletAddress: (id: string) => void;
	suggestionsRef: RefObject<AddressSuggestions>;
	input: InputAddressState;
	dispatch: Dispatch<Action>;
	isLoading: boolean;
}

const UserMainContext = createContext<UserMainContextProps | null>(null);

export function useUserMainContext() {
	const context = useContext(UserMainContext);
	if (!context)
		throw new Error(
			'UserMain.* component must be render as a child of UserMain comopnent'
		);
	return context;
}

export default UserMainContext;
