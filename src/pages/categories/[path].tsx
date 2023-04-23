import { Center } from '@chakra-ui/react';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import type { GetStaticProps, NextPage } from 'next';
import superjson from 'superjson';
import { appRouter } from '~/server/api/root';
import { prisma } from '~/server/db';

const CategorysPage: NextPage<{ path: string }> = ({ path }) => {
	return <Center>Youre now on {path}</Center>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const ssg = createProxySSGHelpers({
		router: appRouter,
		ctx: { prisma, userId: null },
		transformer: superjson,
	});
	const path = ctx.params?.path;
	if (typeof path !== 'string') throw new Error('no path');
	await ssg.categorys.get.prefetch();
	return {
		props: {
			trpcState: ssg.dehydrate(),
			path,
		},
	};
};

export const getStaticPaths = () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};

export default CategorysPage;
