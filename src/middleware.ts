import { withClerkMiddleware } from '@clerk/nextjs/server';
import {
	NextResponse,
	type NextFetchEvent,
	type NextRequest,
} from 'next/server';
import { ratelimit } from './server/helpers/ratelimits';

export default withClerkMiddleware(
	async (
		request: NextRequest,
		event: NextFetchEvent
	): Promise<Response | undefined> => {
		const ip = request.ip ?? '127.0.0.1';

		const { success, pending, limit, reset, remaining } =
			await ratelimit.baseAll.limit(`ratelimit_middleware_${ip}`);
		event.waitUntil(pending);

		const res = success
			? NextResponse.next()
			: NextResponse.redirect(new URL('/api/blocked', request.url));

		res.headers.set('X-RateLimit-Limit', limit.toString());
		res.headers.set('X-RateLimit-Remaining', remaining.toString());
		res.headers.set('X-RateLimit-Reset', reset.toString());
		return res;
	}
);

export const config = {
	matcher: ['/((?!_next/image|_next/static|favicon.ico).*)', '/api/:path*'],
};
