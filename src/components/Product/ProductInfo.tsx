import { Stack, Tag, Text } from '@chakra-ui/react';
import { useProductCardContext } from '~/context/productCardContext';

const ProductInfo = () => {
	const { product, admin } = useProductCardContext();
	return (
		<>
			<Stack fontSize={16} textAlign="center">
				<Text>{product.name}</Text>
				<Text
					fontSize={12}
					textColor={'gray.500'}
					h="100px"
					borderBottom="none"
					boxShadow="inset 0 -10px 10px -10px"
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
					<Text>{` шт`}</Text>
				</>
			)}
		</>
	);
};

export default ProductInfo;
