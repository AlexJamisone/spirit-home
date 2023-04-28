import { Center } from '@chakra-ui/react';
import { SignUp } from '@clerk/nextjs';
import { motion } from 'framer-motion';

const SignUpPage = () => {
	return (
		<Center
			pt={150}
			as={motion.div}
			initial={{ opacity: 0, y: 50 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: { type: 'spring', duration: 2 },
			}}
		>
			<SignUp signInUrl="/signin" />
		</Center>
	);
};

export default SignUpPage;
