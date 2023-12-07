import { Tag } from '@chakra-ui/react';

const ProductTag = ({ category }: { category: string | null }) => {
	return <Tag>{category}</Tag>;
};

export default ProductTag;
