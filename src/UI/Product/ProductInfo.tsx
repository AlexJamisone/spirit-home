import { Stack, Text } from '@chakra-ui/react';
const ProductInfo = ({ name }: { name: string }) => {
	return (
		<Stack
			fontWeight={400}
			textColor="second"
			fontSize={16}
			textAlign="center"
		>
			<Text>{name}</Text>
		</Stack>
	);
};

export default ProductInfo;
