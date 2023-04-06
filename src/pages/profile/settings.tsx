import { Center } from '@chakra-ui/react';
import { UserProfile } from '@clerk/nextjs';
import { motion } from 'framer-motion';

const SettingsPage = () => {
	return (
		<Center
			as={motion.div}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transitionDuration=".3s"
		>
			<UserProfile />
		</Center>
	);
};

export default SettingsPage;
