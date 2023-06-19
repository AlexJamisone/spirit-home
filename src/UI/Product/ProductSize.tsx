import { Stack, Tag } from '@chakra-ui/react';
import type { SyntheticEvent } from 'react';
import { useProductCardContext } from '~/context/productCardContext';
import ProductSizeButton from './ProductSizeButton';

type ProductSizeProps = {
	isAdmin?: boolean;
};

const ProductSize = ({ isAdmin }: ProductSizeProps) => {
	const { product, selectedSize, setSelectedtSize, setError } =
		useProductCardContext();
	const handlSelect = (e: SyntheticEvent, id: string, name: string) => {
		setSelectedtSize((prevSelected) => {
			setError(false);
			if (prevSelected.id === id) {
				return { id: '', name: '' };
			} else {
				return { id, name };
			}
		});
		e.stopPropagation();
	};
	return (
		<Stack
			direction="row"
			flexWrap="wrap"
			gap={[1, 2]}
			justifyContent="center"
		>
			{isAdmin
				? product.quantity
						.sort((a, b) =>
							a.size.size.localeCompare(b.size.size, undefined, {
								numeric: true,
							})
						)
						.map(({ id, value, size }) => (
							<Tag key={id} textAlign="center">
								{size.size} - {value} шт
							</Tag>
						))
				: product.quantity
						.sort((a, b) =>
							a.size.size.localeCompare(b.size.size, undefined, {
								numeric: true,
							})
						)
						.map(({ id, size, value }) => (
							<ProductSizeButton
								quantity={value}
								size={size.size}
								key={id}
								isActive={id === selectedSize.id}
								onClick={(e) => handlSelect(e, id, size.size)}
							/>
						))}
		</Stack>
	);
};

export default ProductSize;
