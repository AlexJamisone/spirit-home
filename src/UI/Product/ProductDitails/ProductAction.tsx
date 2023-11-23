import { Button, ButtonGroup, Icon, IconButton } from '@chakra-ui/react';
import { TiHeartOutline } from 'react-icons/ti';
import { useProductContext } from '~/context/productContext';
import { useCart } from '~/stores/useCart';
import { useFavorites } from '~/stores/useFavorites';

const ProductAction = () => {
	const { product, productDitalState, prodAction } = useProductContext();
	const { toggle, ids } = useFavorites();
	const { add } = useCart();
	return (
		<ButtonGroup isAttached variant="outline">
			<Button
				onClick={() => {
					if (productDitalState.size === '') {
						prodAction({
							type: 'SET_ERROR',
							payload: {
								isError: true,
								message: 'Выберите размер',
							},
						});
					} else {
						add({
							id: product.id,
							image: product.image[0] ?? '',
							price: product.price,
							size: productDitalState.size,
							title: product.name,
						});
						prodAction({ type: 'SET_CLEAR' });
					}
				}}
			>
				Добавить в корзину
			</Button>
			<IconButton
				aria-label="like"
				color={ids.includes(product.id) ? 'red.300' : undefined}
				onClick={() => toggle(product.id)}
				icon={<Icon as={TiHeartOutline} boxSize={5} />}
			/>
		</ButtonGroup>
	);
};

export default ProductAction;
