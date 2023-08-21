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

const theme = extendTheme({
	defultTheme,
	colors,
});

export default theme;

export { theme };
