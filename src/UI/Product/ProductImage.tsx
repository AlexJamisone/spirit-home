import { Image } from '@chakra-ui/next-js';
import { Center, type CenterProps } from '@chakra-ui/react';
import { Pagination, Zoom } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useProductCardContext } from '~/context/productCardContext';
import { env } from '~/env.mjs';

type ProductImageProps = {
	container?: CenterProps;
	zoom?: boolean;
};

const ProductImage = ({ container, zoom }: ProductImageProps) => {
	const { product } = useProductCardContext();
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
							src={env.NEXT_PUBLIC_UPLOADTHING_URL + src}
							objectFit="contain"
							width={175}
							height={175}
							quality={100}
						/>
					</Center>
				</SwiperSlide>
			))}
		</Center>
	);
};

export default ProductImage;
