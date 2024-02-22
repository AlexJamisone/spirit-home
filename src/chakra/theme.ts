import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { defbtn } from './buttonTheme';

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
	heading: `'Abril Fatface', serif`,
};

const theme = extendTheme({
	defultTheme,
	colors,
	fonts,
	components: { Button: defbtn },
});

export default theme;

export { theme };
