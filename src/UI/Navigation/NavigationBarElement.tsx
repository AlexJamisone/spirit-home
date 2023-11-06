import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const NavigationBarElement = () => {
	return (
		<Box
			as={motion.div}
			position="absolute"
			left={'50%'}
			w="96%"
			h="140%"
			transform="translateX(-50%)"
			border="2px solid"
			borderColor="second"
			roundedBottom="50px"
			zIndex={-10}
			animate={{
				top: scrollY < 20 ? undefined : `-${scrollY}px`,
				opacity: scrollY > 100 ? 0 : 1,
				transition: {
					duration: 1,
					damping: 300,
				},
			}}
		/>
	);
};

export default NavigationBarElement;
