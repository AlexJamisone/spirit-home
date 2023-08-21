import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const defultTheme: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: true,
	disableTransitionOnChange: true,
};

const colors = {
	brand: '#FF99FF',
	second: '#000099',
};

export const theme = extendTheme({ defultTheme, colors });
