import { useRouter } from 'next/router';

const CategorysPage = () => {
	const router = useRouter();
	const { catig } = router.query;
	console.log(catig);
	return <div>Youre now on {catig}</div>;
};

export default CategorysPage;
