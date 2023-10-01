import { Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MainTitle = () => {
	return (
		<Heading
			as={motion.h2}
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
			lineHeight={1.5}
			fontSize={54}
			textAlign="center"
			w={[null, null, null, 780, null, 475]}
			textColor="second"
			fontWeight="thin"
			pt={350}
			cursor="default"
		>
			The Sun is Up, The Sky is Blue, It`s so beautiful, and so are{' '}
			<Text
				as="span"
				textTransform="uppercase"
				position="relative"
				zIndex={20}
				_after={{
					content: `""`,
					display: 'inline-block',
					position: 'absolute',
					width: '120px',
					height: '60px',
					bgColor: 'brand',
					top: 0,
					right: '-5%',
					zIndex: -1,
					borderRadius: '83% 17% 69% 31% / 74% 70% 30% 26% ',
				}}
			>
				you
			</Text>
		</Heading>
	);
};
export default MainTitle;
