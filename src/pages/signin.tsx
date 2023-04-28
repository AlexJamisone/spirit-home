import { Center } from '@chakra-ui/react';
import { SignIn } from '@clerk/nextjs';
import { motion } from 'framer-motion';
const SignInPage = () => {
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
			<SignIn signUpUrl="/signup" afterSignInUrl="/profile/main" />
		</Center>
	);
};

export default SignInPage;
