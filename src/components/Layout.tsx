import { Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<Stack
			as={motion.main}
			initial={{ opacity: 0, y: 50 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: { type: 'spring', duration: 2 },
			}}
			pt={180}
			pb={50}
			direction="row"
			gap={10}
			layout
			justifyContent="center"
			alignItems="center"
		>
			{children}
		</Stack>
	);
};

export default Layout;
