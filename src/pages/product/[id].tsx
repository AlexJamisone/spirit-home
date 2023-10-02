import { useRouter } from 'next/router';
import { api } from '~/utils/api';

const ProductPage = () => {
	const { query } = useRouter();
	const { data: product } = api.products.getSinglProduct.useQuery({
		id: query.id as string,
	});
	return <div>ProductPage</div>;
};

export default ProductPage;
