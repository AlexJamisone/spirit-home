import { Button, Icon, IconButton, Spinner } from '@chakra-ui/react';
import type { IconType } from 'react-icons';
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi';
import { useProductCardContext } from '~/context/productContext';
import Overlay from '../NoData/Overlay';

const ProductAction = () => {
	const { product, admin, handlAddToCart, handleArchivedProduct, isLoading } =
		useProductCardContext();
	const handlArchiveButton = (icon: IconType) => {
		return (
			<IconButton
				icon={<Icon as={icon} color="cyan.600" />}
				aria-label="deletButton"
				size="md"
				position="absolute"
				top={5}
				right={5}
				zIndex={20}
				onClick={(e) =>
					handleArchivedProduct?.(product.id, product.name, e)
				}
			/>
		);
	};
	return (
		<>
			{isLoading ? (
				<>
					<Overlay />
					<Spinner
						position="absolute"
						top={'50%'}
						zIndex={20}
						size="xl"
						cursor="not-allowed"
					/>
				</>
			) : null}
			{product.archived ? (
				<>
					<Overlay />
				</>
			) : null}
			{admin === 'ADMIN' ? (
				<>
					{product.archived
						? handlArchiveButton(BiArchiveOut)
						: handlArchiveButton(BiArchiveIn)}
				</>
			) : (
				<Button
					size={['sm', 'md']}
					onClick={(e) => handlAddToCart?.(e)}
				>
					В корзину
				</Button>
			)}
		</>
	);
};

export default ProductAction;
