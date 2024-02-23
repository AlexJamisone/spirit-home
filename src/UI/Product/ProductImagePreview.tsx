import { Image, Skeleton } from '@chakra-ui/react';
import { env } from '~/env.mjs';

const ProductImagePreview = ({
	image,
	isBig,
}: {
	image: string[];
	isBig: boolean;
	onHov: boolean;
}) => {
	const w = isBig ? 560 : 280;
	const h = isBig ? 649 : 361;
	return (
		<Image
			fallback={<Skeleton w={w} h={h} />}
			objectFit="cover"
			src={env.NEXT_PUBLIC_UPLOADTHING_URL + image[0]}
			alt={image[0] as string}
			w={w}
			h={h}
		/>
	);
};

export default ProductImagePreview;
