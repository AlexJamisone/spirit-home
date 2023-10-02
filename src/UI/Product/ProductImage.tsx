import { Image } from '@chakra-ui/next-js';
import { Box, Center, Stack } from '@chakra-ui/react';
import useEmblaCarousel from 'embla-carousel-react';
import { useProductCardContext } from '~/context/productCardContext';
import { env } from '~/env.mjs';

const ProductImage = () => {
	const { product } = useProductCardContext();
	const [emblaRef] = useEmblaCarousel();
	return (
		<Center
			ref={emblaRef}
			overflow="hidden"
			onClick={(e) => e.stopPropagation()}
		>
			<Stack direction="row">
				{product.image.map((id) => (
					<Box key={id} flex="0 0 100%" minW={0}>
						<Image
							alt={`product${id}`}
							src={env.NEXT_PUBLIC_UPLOADTHING_URL + id}
							width={300}
							height={300}
							quality={100}
							objectFit="cover"
						/>
					</Box>
				))}
			</Stack>
		</Center>
	);
};

export default ProductImage;
