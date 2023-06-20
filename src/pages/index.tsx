import { Image } from '@chakra-ui/next-js';
import {
	AbsoluteCenter,
	Center,
	Heading,
	Spinner,
	Stack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { type NextPage } from 'next';
import { useState } from 'react';
import { IoListOutline } from 'react-icons/io5';
import { Autoplay, Keyboard, Mousewheel, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductsCard from '~/UI/Product/ProductCard';
import MapsWidget from '~/UI/YandexMaps/MapsWidget';
import NoData from '~/components/NoData/NoData';
import SearchInput from '~/components/SearchInput';
import Social from '~/components/Social';
import { api } from '~/utils/api';

const Home: NextPage = () => {
	const { data: products, isLoading } = api.products.get.useQuery();
	const [search, setSearch] = useState('');
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
				<Center
					as={motion.main}
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: {
							type: 'spring',
							duration: 1.5,
						},
					}}
				>
					<Image
						objectFit="cover"
						fill={true}
						src="/assets/3.jpg"
						alt="bg"
						quality={100}
						loading="lazy"
					/>
				</Center>
			</SwiperSlide>
			<SwiperSlide>
				<Stack mt={150} mx={[0, 0, 0, 20]} as="main">
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
						position="relative"
					>
						{!products || isLoading ? (
							<AbsoluteCenter>
								<Spinner />
							</AbsoluteCenter>
						) : products.length === 0 ? (
							<AbsoluteCenter>
								<NoData
									text="Пока нет изделий"
									icon={IoListOutline}
								/>
							</AbsoluteCenter>
						) : (
							products
								.filter(
									(product) =>
										product.name
											.toLowerCase()
											.includes(search.toLowerCase()) &&
										!product.archived
								)
								.map((product) => (
									<SwiperSlide key={product.id}>
										<Center
											as={motion.div}
											initial={{ opacity: 0 }}
											whileInView={{
												opacity: 1,
												transition: {
													type: 'spring',
													duration: 0.5,
												},
											}}
										>
											<ProductsCard
												product={product}
												image={<ProductsCard.Image />}
												info={<ProductsCard.Info />}
												action={<ProductsCard.Action />}
												favorites={
													<ProductsCard.Favorites />
												}
												size={<ProductsCard.Size />}
												admin="USER"
											/>
										</Center>
									</SwiperSlide>
								))
						)}
					</Center>
				</Stack>
			</SwiperSlide>
			<SwiperSlide>
				<Center
					as={motion.footer}
					pt={150}
					justifyContent="space-evenly"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{
						opacity: 1,
						y: 0,
						transition: {
							type: 'spring',
							duration: 0.5,
						},
					}}
					flexDirection="column"
					gap={10}
				>
					<MapsWidget />
					<Heading
						fontSize={['2xl', '3xl']}
						textAlign="center"
						fontWeight="extrabold"
						bgGradient="linear(to-l, #9796f0, #fbc7d4)"
						bgClip="text"
					>
						Подписывайтесь на нас в соц сетях!
					</Heading>
					<Social />
				</Center>
			</SwiperSlide>
		</Center>
	);
};

export default Home;
