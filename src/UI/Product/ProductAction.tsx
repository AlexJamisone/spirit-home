import {
	Button,
	Icon,
	IconButton,
	Spinner,
	type ButtonProps,
} from '@chakra-ui/react';
import type { IconType } from 'react-icons';
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi';
import { useProductCardContext } from '~/context/productCardContext';
import Overlay from '../../components/NoData/Overlay';

type ProductActionProps = {
	container?: ButtonProps;
};

const ProductAction = ({ container }: ProductActionProps) => {
	const { product, admin, handlAddToCart, handleArchivedProduct, isLoading } =
		useProductCardContext();
	const handlArchiveButton = (icon: IconType) => {
		return (
			<IconButton
				icon={<Icon as={icon} color="cyan.600" />}
				aria-label="deletButton"
				size="sm"
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
					{...container}
					variant="outline"
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
