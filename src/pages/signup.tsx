import { SignUp } from '@clerk/nextjs';
import Layout from '~/components/Layout';

const SignUpPage = () => {
	return (
		<Layout>
			<SignUp signInUrl="/signin" />
		</Layout>
	);
};

export default SignUpPage;
