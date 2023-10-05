import { SignIn } from '@clerk/nextjs';
import Layout from '~/components/Layout';
const SignInPage = () => {
	return (
		<Layout>
			<SignIn signUpUrl="/signup" afterSignInUrl="/profile/main" />
		</Layout>
	);
};

export default SignInPage;
