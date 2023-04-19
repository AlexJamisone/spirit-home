import { Center } from '@chakra-ui/react';
import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
	return (
		<Center>
			<SignUp signInUrl="/signin" />
		</Center>
	);
};

export default SignUpPage;
