import { SignIn } from '@clerk/nextjs';
import { Center } from '@chakra-ui/react';
const SignInPage = () => {
	return (
		<Center>
			<SignIn signUpUrl="/signup" afterSignInUrl='/profile/mainE'/>
		</Center>
	);
};

export default SignInPage;
