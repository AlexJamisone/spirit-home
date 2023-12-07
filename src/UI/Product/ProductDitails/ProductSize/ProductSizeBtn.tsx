import { Button } from '@chakra-ui/react';
import type { Size } from '@prisma/client';
import { useProductDitails } from '~/stores/useProductDitails';

const ProductSizeBtn = ({ size }: { size: Size }) => {
	const error = useProductDitails((state) => state.error);
	const sizeValue = useProductDitails((state) => state.size);
	const setSize = useProductDitails((state) => state.setSize);
	const setError = useProductDitails((state) => state.setError);
	return (
		<Button
			variant="outline"
			borderColor={error?.isError ? 'orange.300' : undefined}
			size={{
				xl: 'sm',
				'2xl': 'md',
			}}
			onClick={() => {
				setError({ message: '', isError: false });
				setSize(size.value);
			}}
			isActive={sizeValue === size.value}
		>
			{size.value}
		</Button>
	);
};

export default ProductSizeBtn;
