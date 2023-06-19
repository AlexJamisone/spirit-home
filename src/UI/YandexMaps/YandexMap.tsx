import { Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Maps from './Maps';
import YandexProvider from './YandexProvider';

const YandexMap = () => {
	return (
		<Stack
			as={motion.div}
			initial={{
				opacity: 0,
				y: 50,
				filter: 'blur(5px)',
			}}
			animate={{
				opacity: 1,
				y: 0,
				filter: 'blur(0px)',
				transition: { duration: 0.3, delay: 0.5 },
			}}
		>
			<YandexProvider>
				<Maps />
			</YandexProvider>
		</Stack>
	);
};

export default YandexMap;
