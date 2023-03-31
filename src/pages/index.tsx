import { type NextPage } from 'next';
import Head from 'next/head';
import { SignIn } from '@clerk/nextjs';
import { Box, Center, Icon } from '@chakra-ui/react';

import { api } from '~/utils/api';
import Logo from '~/components/Logo';
import Navigation from '~/components/Navigation';


const Home: NextPage = () => {
	
	const {data} = api.users.hello.useQuery({text: "HI"})
	return (
		<>
			<Head>
				<title>Index Page</title>
				<meta name="description" content="" />
			</Head>
			<Box as='main'>
			</Box>
		</>
	);
};

export default Home;
