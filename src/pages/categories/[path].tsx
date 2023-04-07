import { Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const CategorysPage = () => {
	const router = useRouter();
	const { path } = router.query;
	return (
		<Center>
			Youre now on {path}
		</Center>
	)
};

export default CategorysPage;
