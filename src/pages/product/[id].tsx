import { useRouter } from 'next/router';
import ProductDitails from '~/UI/Product/ProductDitails';
import Layout from '~/components/Layout';

const ProductPage = () => {
	const { query } = useRouter();

	return (
		<Layout>
			<ProductDitails query={query.id as string} />
		</Layout>
	);
};

export default ProductPage;
