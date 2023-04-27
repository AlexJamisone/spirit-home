import { Center } from '@chakra-ui/react';
import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
	return (
		<Center pt={150}>
			<SignUp signInUrl="/signin" />
		</Center>
	);
};

export default SignUpPage;
