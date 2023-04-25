import { Center, Image, Spinner } from '@chakra-ui/react';
import { type NextPage } from 'next';
import { Keyboard, Mousewheel, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductAction from '~/components/Product/ProductAction';
import ProductsCard from '~/components/Product/ProductCard';
import ProductImage from '~/components/Product/ProductImage';
import ProductInfo from '~/components/Product/ProductInfo';
import { api } from '~/utils/api';

const Home: NextPage = () => {
	const { data: products, isLoading } = api.products.get.useQuery();
	if (!products) return null;
	if (isLoading)
		return (
			<Center>
				<Spinner />
			</Center>
		);
	return (
		<Center
			as="main"
			gap={5}
			flexWrap="wrap"
			position="relative"
			overflow="hidden"
		>
			<Center
				as={Swiper}
				direction="vertical"
				modules={[Pagination, Keyboard, Mousewheel]}
				keyboard={{ pageUpDown: true }}
				mousewheel
				pagination={{ clickable: true, enabled: true,  }}
				justifyContent="center"
				h={'100vh'}
				w={'100vw'}
			>
				<SwiperSlide>
					<Center>
						<Image
							w='100vw'
							height="100vh"
							src="assets/3.jpg"
							alt="bg"
							objectFit="cover"
						/>
					</Center>
				</SwiperSlide>
				<SwiperSlide>
					<Center
						mt={5}
						gap={5}
						flexWrap="wrap"
						w='100%'
					>
						{products
							.filter((product) => !product.archived)
							.map((product) => (
								<ProductsCard
									key={product.id}
									product={product}
									image={<ProductImage />}
									info={<ProductInfo />}
									action={<ProductAction />}
									admin="USER"
								/>
							))}
					</Center>
				</SwiperSlide>
			</Center>
		</Center>
	);
};

export default Home;
