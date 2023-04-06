import { Box, Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Menu from './Menu';

const UserProfilePage = () => {
	
	return (
		<Box display="flex" gap={20}>
			<Box w={['20%']}>
			</Box>
			<Center
				as={motion.div}
				initial={{ opacity: 0, y: 0 }}
				animate={{ opacity: 1, y: 0 }}
			>
				
			</Center>
		</Box>
	);
};

export default UserProfilePage;
