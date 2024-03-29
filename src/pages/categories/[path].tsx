import { Center } from '@chakra-ui/react';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import type { GetStaticProps, NextPage } from 'next';
import { BsWind } from 'react-icons/bs';
import superjson from 'superjson';
import ProductsCard from '~/UI/Product/ProductCard';
import NoData from '~/components/NoData/NoData';
import { appRouter } from '~/server/api/root';
import { prisma } from '~/server/db';
import { api } from '~/utils/api';

const CategorysPage: NextPage<{ path: string }> = ({ path }) => {
	const { data: products } = api.products.getByCategory.useQuery({
		category: path,
	});
	if (!products) return <NoData text="Пусто" icon={BsWind} />;
	return (
		<Center pt={160} gap={5} flexWrap="wrap">
			{products.map((product) => (
				<ProductsCard
					key={product.id}
					product={product}
					role="USER"
					isBig={false}
				/>
			))}
		</Center>
	);
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
