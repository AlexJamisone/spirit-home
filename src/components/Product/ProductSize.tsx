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
		<Stack direction="row">
			{isAdmin
				? product.size
						.sort((a, b) =>
							a.size.localeCompare(b.size, undefined, {
								numeric: true,
							})
						)
						.map(({ id, quantity, size }) => (
							<Tag key={id} textAlign="center">
								{size} - {quantity[0]?.value} шт
							</Tag>
						))
				: product.size
						.sort((a, b) =>
							a.size.localeCompare(b.size, undefined, {
								numeric: true,
							})
						)
						.map(({ id, size, quantity }) => (
							<ProductSizeButton
								quantity={quantity[0]?.value}
								size={size}
								key={id}
								isActive={id === selectedSize.id}
								onClick={(e) => handlSelect(e, id, size)}
							/>
						))}
		</Stack>
	);
};

export default ProductSize;
