import { Button, Icon, Stack, Text, useDisclosure } from '@chakra-ui/react';
import type { Product, ProductPriceHistory, Size } from '@prisma/client';
import { useReducer, useState } from 'react';

import { IoIosAddCircleOutline } from 'react-icons/io';
import { FormProductReducer, initialState } from '~/reducer/FormReducer';
import { api } from '~/utils/api';
import ProductAction from '../Product/ProductAction';
import ProductsCard from '../Product/ProductCard';
import ProductImage from '../Product/ProductImage';
import ProductInfo from '../Product/ProductInfo';
import AdminCreateProductsImages from './AdminCreateProducts/AdminCreateProductsImages';
import CategoriesSelector from './AdminCreateProducts/CategoriesSelector';
import CreateProductInputs from './AdminCreateProducts/CreateProductInputs';
import CreateSize from './AdminCreateProducts/CreateSize';
import DragDrop from './AdminCreateProducts/Drag&Drop';
import ProducCreateAction from './AdminCreateProducts/ProducCreateAction';
import AdminProductsModal from './AdminProductsModal';

const AdminProducts = () => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const [edit, setEdit] = useState(false);
	const { data: size } = api.size.get.useQuery();

	const [form, dispatch] = useReducer(FormProductReducer, initialState);

	const { data: user } = api.users.get.useQuery();
	const { data: products } = api.products.get.useQuery();

	if (!products) return null;

	const handlEdit = (
		product: Product & { priceHistory: ProductPriceHistory[]; size: Size[] }
	) => {
		setEdit(true);
		dispatch({
			type: 'SET_ALL',
			payload: {
				id: product.id,
				category: product.categoryTitle as string,
				description: product.description,
				image: product.image.map((path) => ({ path, error: null })),
				name: product.name,
				price: product.priceHistory[0]?.price as number,
				size: product.size,
			},
		});
		onToggle();
	};

	return (
		<Stack
			direction="row"
			alignItems="center"
			gap={10}
			flexWrap="wrap"
			justifyContent="center"
			w={['80%']}
		>
			<Button
				h="300px"
				variant="outline"
				rightIcon={<Icon as={IoIosAddCircleOutline} boxSize={8} />}
				onClick={() => onToggle()}
			>
				Добавить новый товар
			</Button>
			{products.length === 0 ? (
				<Text>Пока что нету Товаров</Text>
			) : (
				products
					.map((product) => {
						return (
							<ProductsCard
								key={product.id}
								admin={user?.role}
								product={product}
								image={<ProductImage />}
								info={<ProductInfo />}
								handlEdit={handlEdit}
								action={<ProductAction />}
							/>
						);
					})
					.reverse()
			)}
			<AdminProductsModal
				isOpen={isOpen}
				onClose={onClose}
				edit={edit}
				form={form}
				dispatch={dispatch}
				setEdit={setEdit}
				action={<ProducCreateAction />}
				images={<AdminCreateProductsImages />}
				inputs={<CreateProductInputs />}
				categories={<CategoriesSelector />}
				drag={<DragDrop />}
				size={<CreateSize />}
			/>
		</Stack>
	);
};

export default AdminProducts;
