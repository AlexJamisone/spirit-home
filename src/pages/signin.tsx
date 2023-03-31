import { SignIn } from '@clerk/nextjs';
import { Center } from '@chakra-ui/react';
const SignInPage = () => {
	return (
		<Center>
			<SignIn signUpUrl="/signup" />
		</Center>
	);
};

export default SignInPage;
