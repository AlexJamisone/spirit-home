import { usersRouter } from '~/server/api/routers/users';
import { createTRPCRouter } from '~/server/api/trpc';
import { addressesRouter } from './routers/addresses';
import { categorysRouter } from './routers/categorys';
import { chartsRouter } from './routers/charts';
import { favoritesRouter } from './routers/favorites';
import { ordersRouter } from './routers/orders';
import { productsRouter } from './routers/products';
import { sizeRouter } from './routers/size';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	users: usersRouter,
	categorys: categorysRouter,
	products: productsRouter,
	orders: ordersRouter,
	addresses: addressesRouter,
	size: sizeRouter,
	favorites: favoritesRouter,
	charts: chartsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
