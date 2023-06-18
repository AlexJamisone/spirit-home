import PusherFront from 'pusher-js';
import { env } from '~/env.mjs';

export const pusherFront = new PusherFront(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
	cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
});
