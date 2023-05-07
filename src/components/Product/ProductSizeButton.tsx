import { Button } from '@chakra-ui/react';
import type { MouseEventHandler } from 'react';
import { useProductCardContext } from '~/context/productCardContext';

type ProductSizeButtonProps = {
	size: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
	isActive: boolean;
	quantity?: number;
};

const ProductSizeButton = ({
	isActive,
	size,
	onClick,
	quantity,
}: ProductSizeButtonProps) => {
	const { error } = useProductCardContext();
	return (
		<Button
			size={['sm']}
			isActive={isActive}
			onClick={onClick}
			isDisabled={quantity! <= 0}
			border={error ? '2px solid' : ''}
			borderColor={error ? 'orange.200' : ''}
		>
			{size}
		</Button>
	);
};

export default ProductSizeButton;
