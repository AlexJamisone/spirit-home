import { Button, Tooltip } from '@chakra-ui/react';
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
		<Tooltip
			label={
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				quantity! <= 0
					? 'Доступно под заказ от 14 до 20 дней'
					: `В Наличии ${quantity ?? 0}`
			}
		>
			<Button
				size={['xs']}
				isActive={isActive}
				onClick={onClick}
				border={error ? '2px solid' : ''}
				borderColor={error ? 'orange.200' : ''}
			>
				{size}
			</Button>
		</Tooltip>
	);
};

export default ProductSizeButton;
