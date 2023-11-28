import { Image, Skeleton, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, type MouseEvent } from 'react';
import { useProductCardContext } from '~/context/productCardContext';
import { env } from '~/env.mjs';

const ProductImagePreview = () => {
	const { product } = useProductCardContext();
	const [currentIndex, setCurrentIndex] = useState(0);
	const handlMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		const x = e.nativeEvent.offsetX;
		const imageWidth = e.currentTarget.clientWidth;
		const newIndex = Math.floor((x / imageWidth) * product.image.length);
		if (newIndex >= 0 && newIndex < product.image.length) {
			setCurrentIndex(newIndex);
		}
	};
	const handlMouseLeave = () => {
		setCurrentIndex(0);
	};
	return (
		<Stack
			onMouseMove={handlMouseMove}
			onMouseLeave={handlMouseLeave}
			w={250}
			overflow="hidden"
		>
			{product.image.map((id, index) => (
				<Image
					fallback={
						<Skeleton
							w={300}
							h={300}
							display={index === currentIndex ? 'block' : 'none'}
						/>
					}
					as={motion.img}
					key={`product${id}`}
					src={env.NEXT_PUBLIC_UPLOADTHING_URL + id}
					display={index === currentIndex ? 'block' : 'none'}
					alt={`product${id}`}
					width={300}
					height={300}
					objectFit="cover"
					initial={{ opacity: index === currentIndex ? 1 : 0 }}
					animate={{
						opacity: index === currentIndex ? 1 : 0,
						transition: {
							type: 'spring',
							duration: 1,
						},
					}}
				/>
			))}
		</Stack>
	);
};

export default ProductImagePreview;
