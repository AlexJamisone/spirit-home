import type { User as UserClerk } from '@clerk/nextjs/dist/api';
import type { User as UserPrisma, Cart, Order, Comment, Catrgory } from '@prisma/client';

export const filterUserForClient = (
	userFromCler: UserClerk,
	userFromPrisma: UserPrisma & {
		cart: Cart | null,
		orders: Order[],
		comments: Comment[],
		categories: Catrgory[]
	} | null
) => {
	switch(userFromPrisma?.role) {
		case "ADMIN":
			return {
				id: userFromCler.id,
				username: userFromCler.username,
				profileImageUrl: userFromCler.profileImageUrl,
				createdAt: userFromCler.createdAt,
				email: userFromCler.emailAddresses[0]?.emailAddress,
				firstName: userFromCler.firstName,
				lastName: userFromCler.lastName,
				role: userFromPrisma?.role,
				cart: userFromPrisma?.cart,
				orders: userFromPrisma?.orders,
				comments: userFromPrisma?.comments,
				categories: userFromPrisma.categories
			};
		case "USER": 
			return {
				id: userFromCler.id,
				username: userFromCler.username,
				profileImageUrl: userFromCler.profileImageUrl,
				createdAt: userFromCler.createdAt,
				email: userFromCler.emailAddresses[0]?.emailAddress,
				firstName: userFromCler.firstName,
				lastName: userFromCler.lastName,
				cart: userFromPrisma?.cart,
				orders: userFromPrisma?.orders,
				comments: userFromPrisma?.comments,
			};
	}
};
