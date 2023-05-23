import { Center, Image, type CenterProps } from '@chakra-ui/react';
import { Pagination, Zoom } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useProductCardContext } from '~/context/productCardContext';

type ProductImageProps = {
	container?: CenterProps;
	zoom?: boolean;
};

const ProductImage = ({ container, zoom }: ProductImageProps) => {
	const { product } = useProductCardContext();
	const path = `${
		process.env.NEXT_PUBLIC_SUPABASE_URL as string
	}/storage/v1/object/public/products/`;

	return (
		<Center
			as={Swiper}
			direction="horizontal"
			modules={[Pagination, Zoom]}
			pagination={{ enabled: true, clickable: zoom ? false : true }}
			w="175px"
			h="175px"
			zoom={zoom}
			{...container}
		>
			{product.image.map((src) => (
				<SwiperSlide key={src}>
					<Center
						className={zoom ? 'swiper-zoom-container' : ''}
						onClick={(e) => e.stopPropagation()}
						cursor={zoom ? 'zoom-in' : 'default'}
					>
						<Image
							alt="product"
							src={path + src}
							objectFit="contain"
							w={[zoom ? 200 : 125, zoom ? 200 : 175]}
							h={[zoom ? 200 : 125, zoom ? 200 : 175]}
						/>
					</Center>
				</SwiperSlide>
			))}
		</Center>
	);
};

export default ProductImage;
