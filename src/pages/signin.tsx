import { Center } from '@chakra-ui/react';
import { SignIn } from '@clerk/nextjs';
const SignInPage = () => {
	return (
		<Center pt={150}>
			<SignIn signUpUrl="/signup" afterSignInUrl="/profile/main" />
		</Center>
	);
};

export default SignInPage;
