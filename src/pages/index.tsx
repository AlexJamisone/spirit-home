import { type NextPage } from 'next';
import Head from 'next/head';

import { api } from '~/utils/api';

const Home: NextPage = () => {
	const hello = api.example.hello.useQuery({ text: 'from tRPC' });

	return (
		<>
			<Head>
				<title>Index Page</title>
				<meta name="description" content="" />
			</Head>
			<main></main>
		</>
	);
};

export default Home;
