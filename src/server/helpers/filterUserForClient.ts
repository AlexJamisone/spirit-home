import type { User } from '@clerk/nextjs/dist/types/server';

export const filterUserForClient = (user: User) => {
	return {
		id: user.id,
		username: user.username,
		profileImageUrl: user.profileImageUrl,
		createdAt: user.createdAt,
		email: user.emailAddresses[0]?.emailAddress,
		firstName: user.firstName,
		lastName: user.lastName,
	};
};
