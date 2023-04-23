import { Center, Image, Spinner } from '@chakra-ui/react';
import { type NextPage } from 'next';
import { Keyboard, Mousewheel, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductsCardNew from '~/components/Product/ProductCardNew';
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
		<>
			<Center
				as="main"
				gap={5}
				flexWrap="wrap"
				h="100%"
				position="relative"
			>
				<Center
					as={Swiper}
					direction="vertical"
					modules={[Pagination, Keyboard, Mousewheel]}
					keyboard={{ pageUpDown: true }}
					mousewheel
					pagination={{ clickable: true, enabled: true }}
					justifyContent="center"
					h={'100vh'}
					w={'100vw'}
				>
					<SwiperSlide>
						<Center>
							<Image
								height="100vh"
								src="assets/2.jpg"
								alt="bg"
								objectFit="fill"
							/>
						</Center>
					</SwiperSlide>
					<SwiperSlide>
						<Center>
							{products
								.filter((product) => !product.archived)
								.map((product) => (
									// <ProductsCardOld
									// 	key={product.id}
									// 	product={product}
									// />
									<ProductsCardNew
										key={product.id}
										product={product}
										image={<ProductImage />}
										info={<ProductInfo />}
										admin='USER'
									/>
								))}
						</Center>
					</SwiperSlide>
				</Center>
			</Center>
		</>
	);
};

export default Home;
