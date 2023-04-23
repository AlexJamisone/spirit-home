import { Stack, Tag, Text } from '@chakra-ui/react';
import { useProductCardContext } from '~/context/productContext';

const ProductInfo = () => {
	const { product, admin } = useProductCardContext();
	return (
		<>
			<Stack fontSize={16} textAlign="center">
				<Text>{product.name}</Text>
				<Text
					fontSize={12}
					textColor={'gray.500'}
					maxH="100px"
					borderBottom="none"
					boxShadow="inset 0 -10px 10px -10px rgba(0, 0, 0, 0.5);"
					rounded="md"
					opacity="0.5"
					overflow="hidden"
				>
					{product.description}
				</Text>
			</Stack>
			{admin === 'USER' ? null : (
				<>
					<Tag>{product.categoryTitle}</Tag>
					<Text>{`${product.quantity} шт`}</Text>
				</>
			)}
		</>
	);
};

export default ProductInfo;
