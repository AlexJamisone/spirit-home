import { Stack } from '@chakra-ui/react';

const Footer = () => {
	return (
		<Stack
			as="footer"
			h={'120px'}
			w="100%"
			roundedTop="3xl"
			bgColor="brand"
			position="relative"
			zIndex={200}
		></Stack>
	);
};

export default Footer;
