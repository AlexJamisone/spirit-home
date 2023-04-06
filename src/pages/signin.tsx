import { SignIn } from '@clerk/nextjs';
import { Center } from '@chakra-ui/react';
const SignInPage = () => {
	return (
		<Center>
			<SignIn signUpUrl="/signup" afterSignInUrl='/profile'/>
		</Center>
	);
};

export default SignInPage;
