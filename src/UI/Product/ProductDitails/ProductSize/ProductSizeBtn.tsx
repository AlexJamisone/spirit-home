import { Button } from '@chakra-ui/react';
import type { Size } from '@prisma/client';
import { useProductContext } from '~/context/productContext';

const ProductSizeBtn = ({ size }: { size: Size }) => {
	const { prodAction, productDitalState } = useProductContext();
	return (
		<Button
			variant="outline"
			borderColor={
				productDitalState.error?.isError ? 'orange.300' : undefined
			}
			size={{
				xl: 'sm',
				'2xl': 'md',
			}}
			onClick={() => {
				prodAction({
					type: 'SET_ALL',
					payload: {
						error: {
							isError: false,
							message: '',
						},
						size: size.value,
					},
				});
			}}
			isActive={productDitalState.size === size.value}
		>
			{size.value}
		</Button>
	);
};

export default ProductSizeBtn;
