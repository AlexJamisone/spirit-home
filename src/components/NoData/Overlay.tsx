import { Box } from '@chakra-ui/react';

const Overlay = () => {
	return (
		<Box
			cursor="not-allowed"
			position="absolute"
			w="100%"
			height="100%"
			top={0}
			right={0}
			zIndex={20}
			bgColor="whiteAlpha.600"
			rounded="3xl"
		></Box>
	);
};

export default Overlay;
