import { Button, ButtonGroup, Icon, IconButton } from '@chakra-ui/react';
import { TiHeartOutline } from 'react-icons/ti';
import { useCart } from '~/context/cartContext';
import { useFavorites } from '~/context/favoritesContext';
import { useProductContext } from '~/context/productContext';

const ProductAction = () => {
	const { cartDispatch } = useCart();
	const { product, productDitalState, prodAction } = useProductContext();
	const { favDispatch, favoritesState } = useFavorites();
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
						cartDispatch({
							type: 'ADD_TO_CART',
							payload: {
								id: product.id,
								image: product.image[0] ?? '',
								price: product.price,
								size: productDitalState.size,
								title: product.name,
							},
						});
						prodAction({ type: 'SET_CLEAR' });
					}
				}}
			>
				Добавить в корзину
			</Button>
			<IconButton
				aria-label="like"
				color={
					favoritesState.includes(product.id) ? 'red.300' : undefined
				}
				onClick={() =>
					favDispatch({ type: 'TOGLLE_FAV', payload: product.id })
				}
				icon={<Icon as={TiHeartOutline} boxSize={5} />}
			/>
		</ButtonGroup>
	);
};

export default ProductAction;
