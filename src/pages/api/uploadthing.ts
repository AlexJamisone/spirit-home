import { createNextPageApiHandler } from 'uploadthing/next-legacy';

import { ourFileRouter } from '~/server/uploadthings';

const handler = createNextPageApiHandler({
	router: ourFileRouter,
});

export default handler;
