import { ChakraProvider } from '@chakra-ui/react';
import { ruRU } from '@clerk/localizations';
import { ClerkProvider, SignedIn } from '@clerk/nextjs';
import { type AppType } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import Menu from '~/UI/Navigation/Menu';
import Navigation from '~/UI/Navigation/Navigation';
import { theme } from '~/chakra/theme';
import { api } from '~/utils/api';
import '../styles/globals.css';

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<ChakraProvider theme={theme}>
			<Head>
				<title>Spirit-Home</title>
				<meta name="description" content="" />
			</Head>
			<Script
				async
				src="https://analytics.umami.is/script.js"
				data-website-id="671dd393-6548-494c-acc4-ac101878e304"
			/>
			<ClerkProvider {...pageProps} localization={ruRU}>
				<Navigation />
				<Component {...pageProps} />
				<SignedIn>
					<Menu />
				</SignedIn>
			</ClerkProvider>
		</ChakraProvider>
	);
};

export default api.withTRPC(MyApp);
