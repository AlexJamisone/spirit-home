import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
export const ratelimit = {
	orders: new Ratelimit({
		redis,
		limiter: Ratelimit.slidingWindow(3, '1 m'),
		analytics: true,
	}),
	favorites: new Ratelimit({
		redis,
		limiter: Ratelimit.slidingWindow(10, '10 s'),
		analytics: true,
	}),
	baseAll: new Ratelimit({
		redis,
		limiter: Ratelimit.cachedFixedWindow(20, '10 s'),
		ephemeralCache: new Map(),
		analytics: true,
	}),
	orderView: new Ratelimit({
		redis,
		limiter: Ratelimit.slidingWindow(7, '10 s'),
		analytics: true,
	}),
};
