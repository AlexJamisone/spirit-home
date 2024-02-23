import { Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MainTitle = () => {
	return (
		<Heading
			as={motion.h2}
            userSelect='none'
			initial={{
				opacity: 0,
				y: -50,
				filter: 'blur(5px)',
			}}
			animate={{
				opacity: 1,
				y: 0,
				filter: 'blur(0px)',
				transition: {
					type: 'spring',
					duration: 1.5,
					delay: 0.3,
				},
			}}
			textTransform="uppercase"
			fontSize={40}
			textAlign="center"
			textColor="white"
			cursor="default"
			fontWeight={400}
			mt={165}
		>
			The Sun is Up,
			<br /> The Sky is Blue,
			<br /> It`s so beautiful,
			<br /> and so are{' '}
			<Text as="span" textColor="second">
				you
			</Text>
		</Heading>
	);
};
export default MainTitle;
