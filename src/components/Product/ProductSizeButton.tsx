import { Button } from '@chakra-ui/react';
import type { MouseEventHandler } from 'react';

type ProductSizeButtonProps = {
	size: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
	isActive: boolean;
};

const ProductSizeButton = ({
	isActive,
	size,
	onClick,
}: ProductSizeButtonProps) => {
	return (
		<Button isActive={isActive} onClick={onClick}>
			{size}
		</Button>
	);
};

export default ProductSizeButton;
