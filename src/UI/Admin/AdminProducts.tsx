import { Button, Icon, Stack, Text, useDisclosure } from '@chakra-ui/react';
import type {
	Category,
	Product,
	ProductPriceHistory,
	Quantity,
	Size,
	SubCategory,
} from '@prisma/client';
import { useReducer, useState } from 'react';
import ProductsCard from '~/UI/Product/ProductCard';

import { IoIosAddCircleOutline } from 'react-icons/io';
import { FormProductReducer, initialState } from '~/reducer/FormReducer';
import { api } from '~/utils/api';
import AdminCreateSize from './AdminCreateSize';
import AdminProductsModal from './AdminProductsModal';

const AdminProducts = () => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const {
		isOpen: isOpenSize,
		onClose: onCloseSize,
		onToggle: onToggleSize,
	} = useDisclosure();
	const [edit, setEdit] = useState(false);
	const [form, dispatch] = useReducer(FormProductReducer, initialState);

	const { data: user } = api.users.get.useQuery();
	const { data: products } = api.products.getForAdmin.useQuery();

	if (!products) return null;
	const handlEdit = (
		product: Product & {
			priceHistory: ProductPriceHistory[];
			quantity: (Quantity & {
				size: Size;
			})[];
			category: Category | null;
			subCategory: SubCategory | null;
		}
	) => {
		setEdit(true);
		dispatch({
			type: 'SET_ALL',
			payload: {
				id: product.id,
				category: {
					id:
						product.category?.id ||
						(product.subCategory?.id as string),
					title:
						product.categoryTitle ||
						(product.subCategoryTitle as string),
					sub: product.category ? false : true,
				},
				description: product.description,
				image: product.image,
				name: product.name,
				price: product.priceHistory[0]?.price as number,
				quantity: product.quantity.map(
					({ id, value, size: { size: name, id: sizeId } }) => ({
						id,
						quantity: value,
						name,
						sizeId,
					})
				),
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
			<Button
				h="300px"
				variant="outline"
				rightIcon={<Icon as={IoIosAddCircleOutline} boxSize={8} />}
				onClick={() => onToggleSize()}
			>
				Добавить новый размер
			</Button>
			{products.length === 0 ? (
				<Text>Пока что нету Товаров</Text>
			) : (
				products.map((product) => {
					return (
						<ProductsCard
							key={product.id}
							role={user?.role}
							product={product}
							image={<ProductsCard.Image />}
							info={<ProductsCard.Info />}
							handlEdit={handlEdit}
						/>
					);
				})
			)}
			<AdminCreateSize isOpen={isOpenSize} onClose={onCloseSize} />
			<AdminProductsModal
				isOpen={isOpen}
				onClose={onClose}
				edit={edit}
				form={form}
				dispatch={dispatch}
				setEdit={setEdit}
				action={<AdminProductsModal.Action />}
				images={<AdminProductsModal.Images />}
				inputs={<AdminProductsModal.Inputs />}
				categories={<AdminProductsModal.Categories />}
				drag={<AdminProductsModal.Drag />}
			/>
		</Stack>
	);
};

export default AdminProducts;
