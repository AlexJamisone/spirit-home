import { Center, Spinner, Stack, Text } from '@chakra-ui/react';
import { type NextPage } from 'next';
import Head from 'next/head';
import ProductsCard from '~/components/ProductsCard';
import { api } from '~/utils/api';

const Home: NextPage = () => {
	const { data: products, isLoading } = api.products.get.useQuery();
	if (!products) return null;
	if (isLoading) return <Spinner />;
	return (
		<>
			<Center as="main" gap={5} flexWrap="wrap">
				{products.map((product) => (
					<ProductsCard key={product.id} product={product} />
				))}
			</Center>
		</>
	);
};

export default Home;
