import Menu from './Menu';
import { useMenuContext } from '~/context/Menu.context';
import { UserProfile } from '@clerk/nextjs';
import { Box, Center, Grid, GridItem, AbsoluteCenter, chakra } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const UserProfilePage = () => {
	const { menuState } = useMenuContext();
	const handlInterface = () => {
		for (const key in menuState) {
			switch (key) {
				case 'settings':
					return <UserProfile />;
				default:
					return null;
			}
		}
	};
	return (
		<Box display="flex" gap={20}>
			<Box w={['20%']}>
				<Menu />
			</Box>
			<Center
				as={motion.div}
				initial={{ opacity: 0, y: 0 }}
				animate={{ opacity: 1, y: 0 }}
			>
				{handlInterface()}
			</Center>
		</Box>
	);
};

export default UserProfilePage;
