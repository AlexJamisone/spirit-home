import { Center, Image, Spinner } from '@chakra-ui/react';
import { type NextPage } from 'next';
import { useState } from 'react';
import { Autoplay, Keyboard, Mousewheel, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductAction from '~/components/Product/ProductAction';
import ProductsCard from '~/components/Product/ProductCard';
import ProductImage from '~/components/Product/ProductImage';
import ProductInfo from '~/components/Product/ProductInfo';
import SearchInput from '~/components/SearchInput';
import { api } from '~/utils/api';

const Home: NextPage = () => {
	const { data: products, isLoading } = api.products.get.useQuery();
	const [search, setSearch] = useState('');

	if (!products) return null;
	if (isLoading)
		return (
			<Center>
				<Spinner />
			</Center>
		);
	return (
		<Center
			as={Swiper}
			direction="vertical"
			longSwipesMs={3000}
			longSwipesRatio={1}
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
						w="full"
						h="100dvh"
						src="assets/3.jpg"
						alt="bg"
						objectFit="cover"
					/>
				</Center>
			</SwiperSlide>
			<SwiperSlide>
				<Center mt={5}>
					<SearchInput setSearch={setSearch} />
				</Center>
				<Center
					breakpoints={{
						390: {
							slidesPerView: 1,
							spaceBetween: 15,
						},
						640: {
							slidesPerView: 2,
							spaceBetween: 10,
						},
						930: {
							slidesPerView: 4,
							spaceBetween: 10,
						},
					}}
					mx={[0, 0, 0, 28]}
					direction="horizontal"
					justifyContent="flex-start"
					py="100px"
					as={Swiper}
					modules={[Autoplay]}
					autoplay={{
						delay: 2500,
						pauseOnMouseEnter: true,
						disableOnInteraction: true,
					}}
					w="100%"
				>
					{products
						.filter((product) =>
							product.name
								.toLowerCase()
								.includes(search.toLowerCase())
						)
						.map((product) => (
							<SwiperSlide key={product.id}>
								<Center>
									<ProductsCard
										product={product}
										image={<ProductImage />}
										info={<ProductInfo />}
										action={<ProductAction />}
										admin="USER"
									/>
								</Center>
							</SwiperSlide>
						))}
				</Center>
			</SwiperSlide>
		</Center>
	);
};

export default Home;
