import { Center,Image,Spinner } from '@chakra-ui/react';
import { type NextPage } from 'next';
import { Controller,Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper,SwiperSlide } from 'swiper/react';
import ProductsCard from '~/components/ProductsCard';
import { api } from '~/utils/api';

const Home: NextPage = () => {
	const { data: products, isLoading } = api.products.get.useQuery();
	if (!products) return null;
	if (isLoading) return <Spinner />;
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
					modules={[Pagination, Controller]}
					pagination={{ clickable: true }}
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
									<ProductsCard
										key={product.id}
										product={product}
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
