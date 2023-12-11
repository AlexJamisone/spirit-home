import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const defultTheme: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: true,
	disableTransitionOnChange: true,
};

const colors = {
	brand: '#FF99FF',
	brandLight: '#EFCAEF',
	second: '#000099',
	secondLight: '#6161ff',
};

const fonts = {
	heading: `'Jost', sans-serif`,
};

const theme = extendTheme({
	defultTheme,
	colors,
	fonts,
});

export default theme;

export { theme };
