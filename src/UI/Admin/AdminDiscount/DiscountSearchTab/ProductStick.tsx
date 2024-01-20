import { Checkbox, Stack, Tag } from '@chakra-ui/react';
import { Product, SubCategory } from '@prisma/client';
import { useHelper } from '~/stores/useHelpers';

type ProductStickProp = {
	product: Product & {
        subCategory: SubCategory | null
        }
};
const ProductStick = ({ product }: ProductStickProp) => {
	const ids = useHelper((state) => state.product.ids);
	const setId = useHelper((state) => state.setId);
	const handlChange = () => {
		setId(product.id);
	};
	console.log(ids);
	return (
		<Stack direction="row" justifyContent='space-between'>
			<Checkbox
				onChange={handlChange}
				isChecked={ids.includes(product.id)}
			>
				{product.name}
			</Checkbox>
			<Tag>{product.categoryTitle || product.subCategory?.title}</Tag>
		</Stack>
	);
};

export default ProductStick;
