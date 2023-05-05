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
					<Stack direction="row">
						{product.size
							.sort((a, b) =>
								a.size.localeCompare(b.size, undefined, {
									numeric: true,
								})
							)
							.map(({ id, quantity, size }) => (
								<Tag key={id}>
									{size} - {quantity[0]?.value} шт
								</Tag>
							))}
					</Stack>
				</>
			)}
		</>
	);
};

export default ProductInfo;
