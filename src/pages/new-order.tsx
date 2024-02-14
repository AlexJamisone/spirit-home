import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '~/components/Layout';
import { useCart } from '~/stores/useCart';
import NewOrder from '~/UI/NewOrder';

const NewOrderPage = () => {
	const items = useCart((state) => state.items);
    const clear = useCart(state => state.clear)
	const { push } = useRouter();
	useEffect(() => {
		if (items.length === 0) {
            clear()
			push('/');
		}
	}, [items.length]);
	return (
		<Layout>
			<NewOrder />
		</Layout>
	);
};

export default NewOrderPage;
