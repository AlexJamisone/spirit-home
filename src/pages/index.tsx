import { Stack } from '@chakra-ui/react';
import { type NextPage } from 'next';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import MainSection from '~/UI/MainSection/MainSection';
import ProductsCard from '~/UI/Product/ProductCard';
import SearchInput from '~/components/SearchInput';
import { api } from '~/utils/api';

const Home: NextPage = () => {
	const { data: products, isLoading } = api.products.getForAll.useQuery();
	const [search, setSearch] = useState('');
	return (
		<Stack as="main" gap={10}>
			<MainSection />
			<SearchInput setSearch={setSearch} />
			<Stack direction="row" justifyContent="center" gap={43} mb={10}>
				{products?.map((product) => (
					<ProductsCard
						product={product}
						key={product.id}
						image={<ProductsCard.Image />}
						info={<ProductsCard.Info />}
						role="USER"
						action={<ProductsCard.Action />}
					/>
				))}
			</Stack>
		</Stack>
	);
};

export default Home;
