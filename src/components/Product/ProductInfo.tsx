import { Stack, Tag, Text } from '@chakra-ui/react';
import { useProductCardContext } from '~/context/productCardContext';

type ProductInfoProps = {
	full?: boolean;
};

const ProductInfo = ({ full }: ProductInfoProps) => {
	const { product, admin } = useProductCardContext();
	return (
		<>
			<Stack fontSize={16} textAlign="center">
				<Text>{full ? null : product.name}</Text>
				<Text
					fontSize={full ? [14, 16] : [12]}
					textColor={full ? 'blackAlpha.900' : 'gray.500'}
					h={full ? '100%' : '100px'}
					borderBottom="none"
					boxShadow={full ? undefined : 'inset 0 -10px 10px -10px'}
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
