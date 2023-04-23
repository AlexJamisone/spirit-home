import { Image } from '@chakra-ui/react';
import { useProductCardContext } from '~/context/productContext';
const ProductImage = () => {
	const { product } = useProductCardContext();
	const path = `${
		process.env.NEXT_PUBLIC_SUPABASE_URL as string
	}/storage/v1/object/public/products/`;

	return (
		<>
			{product.image.map((src) => (
				<Image
					key={src}
					alt="product"
					src={path + src}
					objectFit="cover"
					w={100}
					h={100}
				/>
			))}
		</>
	);
};

export default ProductImage;
