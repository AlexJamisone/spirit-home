import type { Address, Catergory, Point, Role } from '@prisma/client';
import { createContext, useContext, type ChangeEvent } from 'react';

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
		categories?: Catergory[];
	};
	handlAvatar: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
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
