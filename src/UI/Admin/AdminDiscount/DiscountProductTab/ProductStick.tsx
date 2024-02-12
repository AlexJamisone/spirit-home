import { Checkbox, Stack, Tag } from '@chakra-ui/react';
import { Product, SubCategory } from '@prisma/client';
import { useDiscount } from '~/stores/useDiscount';
import { useHelper } from '~/stores/useHelpers';

type ProductStickProp = {
	product: Product & {
		subCategory: SubCategory | null;
	};
};
const ProductStick = ({ product }: ProductStickProp) => {
	const ids = useHelper((state) => state.product.ids);
	const setId = useHelper((state) => state.setId);
	const reset = useDiscount((state) => state.reset);
	const isError = useDiscount((state) => state.error?.isError);
	const err = useDiscount((state) => state.error?.error);
	const handlChange = () => {
		reset();
		setId(product.id);
	};
	return (
		<Stack direction="row" justifyContent="space-between">
			<Checkbox
				onChange={handlChange}
				isChecked={ids.includes(product.id)}
				isInvalid={isError && err?.['path'] !== undefined}
			>
				{product.name}
			</Checkbox>
			<Tag cursor="default">
				{product.categoryTitle || product.subCategory?.title}
			</Tag>
		</Stack>
	);
};

export default ProductStick;
