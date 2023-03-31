import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const defultTheme: ThemeConfig = {
	initialColorMode: 'system',
	useSystemColorMode: true,
	disableTransitionOnChange: true,
};

export const theme = extendTheme({ defultTheme });
