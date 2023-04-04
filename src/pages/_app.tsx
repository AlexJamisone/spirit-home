import { type AppType } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '~/chakra/theme';

import { ClerkProvider } from '@clerk/nextjs';
import { ruRU } from '~/localization/ruRu';

import { api } from '~/utils/api';
import '../styles/globals.css';

import Head from 'next/head';
import Navigation from '~/components/Navigation';

import { MenuContextProdiver } from '~/context/Menu.context';

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<ChakraProvider theme={theme}>
			<Head>
				<title>Spirit-Home</title>
				<meta name="description" content="" />
			</Head>
			<ClerkProvider {...pageProps} localization={ruRU}>
				<Navigation />
				<MenuContextProdiver>
					<Component {...pageProps} />
				</MenuContextProdiver>
			</ClerkProvider>
		</ChakraProvider>
	);
};

export default api.withTRPC(MyApp);
