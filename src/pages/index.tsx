import { Center, Img, Spinner, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
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
					<Img
						as={motion.img}
						h={'100vh'}
						objectFit="cover"
						w="100%"
						src="assets/3.jpg"
						alt="bg"
						initial={{ scale: 1.2, opacity: 0 }}
						animate={{
							scale: 1,
							opacity: 1,
							transition: {
								type: 'spring',
								duration: 500,
								delay: 0.1,
							},
						}}
					/>
				</Center>
			</SwiperSlide>
			<SwiperSlide>
				<Stack mt={150} mx={[0, 0, 0, 20]}>
					<Center>
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
								slidesPerView: 2,
								spaceBetween: 10,
							},
							1200: {
								slidesPerView: 3,
								spaceBetween: 10,
							},
							1400: {
								slidesPerView: 4,
								spaceBetween: 10,
							},
						}}
						direction="horizontal"
						justifyContent="flex-start"
						pt="50px"
						pb="100px"
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
				</Stack>
			</SwiperSlide>
		</Center>
	);
};

export default Home;
