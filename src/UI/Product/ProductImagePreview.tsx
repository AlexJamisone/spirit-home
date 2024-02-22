import { Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { env } from '~/env.mjs';

const ProductImagePreview = ({
	image,
	isBig,
	onHov,
}: {
	image: string[];
	isBig: boolean;
	onHov: boolean;
}) => {
	return (
		<Image
			objectFit="cover"
			src={env.NEXT_PUBLIC_UPLOADTHING_URL + image[0]}
			alt={image[0] as string}
			w={isBig ? 560 : 280}
			h={isBig ? 649 : 361}
		/>
	);
};

export default ProductImagePreview;
