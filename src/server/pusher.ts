import PusherServer from 'pusher';
import { env } from '~/env.mjs';

export const pusherServer = new PusherServer({
	appId: env.PUSHER_APP_ID,
	cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
	key: env.NEXT_PUBLIC_PUSHER_APP_KEY,
	secret: env.PUSHER_APP_SECRET,
});
