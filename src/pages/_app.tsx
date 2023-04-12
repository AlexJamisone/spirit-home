import { type AppType } from 'next/app';
import { SignedIn, SignedOut } from '@clerk/nextjs';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '~/chakra/theme';

import { ClerkProvider } from '@clerk/nextjs';
import { ruRU } from '~/localization/ruRu';

import { api } from '~/utils/api';
import '../styles/globals.css';

import Head from 'next/head';
import Navigation from '~/components/Navigation';
import Menu from '~/components/Menu';
import { CartProvider } from '~/context/cartContext';

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<ChakraProvider theme={theme}>
			<Head>
				<title>Spirit-Home</title>
				<meta name="description" content="" />
			</Head>
			<ClerkProvider {...pageProps} localization={ruRU}>
				<CartProvider>
					<SignedIn>
						<Menu />
						<Navigation />
						<Component {...pageProps} />
					</SignedIn>
					<SignedOut>
						<Navigation />
						<Component {...pageProps} />
					</SignedOut>
				</CartProvider>
			</ClerkProvider>
		</ChakraProvider>
	);
};

export default api.withTRPC(MyApp);
