import { SignedIn, SignedOut } from '@clerk/nextjs';
import { type AppType } from 'next/app';
import Script from 'next/script';

import { ChakraProvider, useMediaQuery } from '@chakra-ui/react';
import { theme } from '~/chakra/theme';

import { ClerkProvider } from '@clerk/nextjs';
import { ruRU } from '~/localization/ruRu';

import { api } from '~/utils/api';
import '../styles/globals.css';

import Head from 'next/head';
import AdminNotification from '~/UI/Admin/AdminNotification';
import Menu from '~/UI/Navigation/Menu';
import Navigation from '~/UI/Navigation/Navigation';
import { CartProvider } from '~/context/cartContext';

const MyApp: AppType = ({ Component, pageProps }) => {
	const [isTablet] = useMediaQuery(['(max-width: 930px)']);
	const { data: role } = api.users.getUserRole.useQuery();
	return (
		<ChakraProvider theme={theme}>
			<Head>
				<title>Spirit-Home</title>
				<meta name="description" content="" />
			</Head>
			<Script
				async
				src="https://umami-production-62a7.up.railway.app/script.js"
				data-website-id="469bcf54-2031-49fb-8f42-4c5dd987ecf3"
			/>
			<ClerkProvider {...pageProps} localization={ruRU}>
				<CartProvider>
					<SignedIn>
						{role === 'ADMIN' && <AdminNotification />}
						{isTablet ? null : <Menu />}
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
