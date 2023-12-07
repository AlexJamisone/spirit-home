import { Button } from '@chakra-ui/react';
import type { Size } from '@prisma/client';
import { useProduct } from '~/stores/useProduct';

const ProductSizeBtn = ({ size }: { size: Size }) => {
	const error = useProduct((state) => state.error);
	const sizeValue = useProduct((state) => state.size);
	const setSize = useProduct((state) => state.setSize);
	const setError = useProduct((state) => state.setError);
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
