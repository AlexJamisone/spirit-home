import { Icon, Stack, Text, type StackProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';

type NoDataProps = {
	text: string;
	icon: IconType;
	container?: StackProps;
};

const NoData = ({ icon, text, container }: NoDataProps) => {
	return (
		<Stack
			as={motion.div}
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: { duration: 1, type: 'spring', delay: 0.5 },
			}}
			mt={3}
			justifyContent="center"
			direction="column"
			alignItems="center"
			w={'100%'}
			{...container}
		>
			<Icon as={icon} boxSize={12} color="gray.200" />
			<Text textAlign="center" fontSize={[14, 16]} textColor="gray.400">
				{text}
			</Text>
		</Stack>
	);
};

export default NoData;
