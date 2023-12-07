import { Text } from '@chakra-ui/react';

const ProductPrice = ({ price }: { price: number }) => {
	return <Text textColor="second" fontWeight={600}>{`${price} ₽`}</Text>;
};

export default ProductPrice;
