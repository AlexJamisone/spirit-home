import {
	AbsoluteCenter,
	Center,
	Heading,
	Img,
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
import NoData from '~/components/NoData/NoData';
import ProductsCard from '~/components/Product/ProductCard';
import SearchInput from '~/components/SearchInput';
import Social from '~/components/Social';
import MapsWidget from '~/components/YandexMaps/MapsWidget';
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
								duration: 1.5,
								delay: 1,
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
						fontSize="3xl"
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
