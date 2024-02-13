import { Button, ButtonGroup, Icon, IconButton } from '@chakra-ui/react';
import { TiHeartOutline } from 'react-icons/ti';
import { useProduct } from '~/hooks/useProduct';
import { useCart } from '~/stores/useCart';
import { useFavorites } from '~/stores/useFavorites';
import { useProductDitails } from '~/stores/useProductDitails';

const ProductAction = () => {
	const { size, setError, setCler } = useProductDitails();
	const toggle = useFavorites((state) => state.toggle);
	const ids = useFavorites((state) => state.ids);
	const add = useCart((state) => state.add);
	const { product } = useProduct();
	if (!product) return null;
	return (
		<ButtonGroup isAttached variant="outline">
			<Button
				onClick={() => {
					if (size === '') {
						setError({ isError: true, message: 'Выбери размер' });
					} else {
						add({
							id: product.id,
							image: product.image[0] ?? '',
							price: product.price,
							size: size,
							title: product.name,
							discount: false,
						});
						setCler();
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
