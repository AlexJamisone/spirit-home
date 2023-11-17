import { Tag } from '@chakra-ui/react';
import { useProductCardContext } from '~/context/productCardContext';

const ProductCategory = () => {
	const {
		product: { categoryTitle, subCategoryTitle },
	} = useProductCardContext();
	return <Tag>{categoryTitle || subCategoryTitle}</Tag>;
};

export default ProductCategory;
