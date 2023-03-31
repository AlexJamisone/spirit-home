import { SignUp } from '@clerk/nextjs';
import { Center } from '@chakra-ui/react';

const SignUpPage = () => {
	return (
		<Center>
			<SignUp signInUrl="/signin" />
		</Center>
	);
};

export default SignUpPage;
