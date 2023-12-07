import { useRouter } from 'next/router';
import { api } from '~/utils/api';

export const useProduct = () => {
	//Avalibel only on page product/[id]
	const router = useRouter();
	const id = router.query.id as string;
	const { data: product, isLoading } = api.products.getSinglProduct.useQuery({
		id,
	});
	return {
		product,
		isLoading,
	};
};
