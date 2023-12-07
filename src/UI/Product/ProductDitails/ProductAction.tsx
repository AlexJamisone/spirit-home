import { Button, ButtonGroup, Icon, IconButton } from '@chakra-ui/react';
import { TiHeartOutline } from 'react-icons/ti';
import { useCart } from '~/stores/useCart';
import { useFavorites } from '~/stores/useFavorites';
import { useProduct } from '~/stores/useProduct';
import { api } from '~/utils/api';

const ProductAction = () => {
	const { size, setError, setCler } = useProduct();
	const toggle = useFavorites((state) => state.toggle);
	const ids = useFavorites((state) => state.ids);
	const add = useCart((state) => state.add);
	const ctx = api.useContext();
	const data = ctx.products.getSinglProduct.getData();
	if (!data) return null;
	return (
		<ButtonGroup isAttached variant="outline">
			<Button
				onClick={() => {
					if (size === '') {
						setError({ isError: true, message: 'Выбери размер' });
					} else {
						add({
							id: data.id,
							image: data.image[0] ?? '',
							price: data.price,
							size: size,
							title: data.name,
						});
						setCler();
					}
				}}
			>
				Добавить в корзину
			</Button>
			<IconButton
				aria-label="like"
				color={ids.includes(data.id) ? 'red.300' : undefined}
				onClick={() => toggle(data.id)}
				icon={<Icon as={TiHeartOutline} boxSize={5} />}
			/>
		</ButtonGroup>
	);
};

export default ProductAction;
