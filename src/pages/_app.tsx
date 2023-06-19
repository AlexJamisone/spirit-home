import { SignedIn, SignedOut } from '@clerk/nextjs';
import { type AppType } from 'next/app';

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
				<script
					defer
					data-domain="spirit-home.ru"
					src="https://plausible.io/js/script.js"
				></script>
			</Head>
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
