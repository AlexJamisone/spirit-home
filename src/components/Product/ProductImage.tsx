import { Center, Image } from '@chakra-ui/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useProductCardContext } from '~/context/productContext';
const ProductImage = () => {
	const { product } = useProductCardContext();
	const path = `${
		process.env.NEXT_PUBLIC_SUPABASE_URL as string
	}/storage/v1/object/public/products/`;

	return (
		<Center
			as={Swiper}
			direction="horizontal"
			modules={[Pagination]}
			pagination={{ enabled: true, clickable: true }}
			justifyContent="space-around"
			w="100%"
			h="100%"
		>
			{product.image.map((src) => (
				<SwiperSlide key={src}>
					<Center>
						<Image
							alt="product"
							src={path + src}
							objectFit="cover"
							w={[100, 150]}
							h={[100, 150]}
						/>
					</Center>
				</SwiperSlide>
			))}
		</Center>
	);
};

export default ProductImage;
