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

const fonts = {
	heading: `'Crimson Text', serif`,
};

const theme = extendTheme({
	defultTheme,
	colors,
	fonts,
});

export default theme;

export { theme };
