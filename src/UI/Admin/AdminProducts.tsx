import { Button, Icon, Stack, Text, useDisclosure } from '@chakra-ui/react';
import type { Category, Product, Size, SubCategory } from '@prisma/client';
import ProductsCard from '~/UI/Product/ProductCard';

import { IoIosAddCircleOutline } from 'react-icons/io';
import { useCreateProduct } from '~/stores/useCreateProduct';
import { api } from '~/utils/api';
import AdminCreateProduct from './AdminCreateProducts';
import AdminCreateSize from './AdminCreateSize';

const AdminProducts = () => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const {
		isOpen: isOpenSize,
		onClose: onCloseSize,
		onToggle: onToggleSize,
	} = useDisclosure();
	const setAll = useCreateProduct((state) => state.setAll);

	const { data: user } = api.users.get.useQuery();
	const { data: products } = api.products.getForAdmin.useQuery();

	if (!products) return null;
	const handlEdit = (
		product: Product & {
			size: Size[];
			category: Category | null;
			subCategory: SubCategory | null;
		}
	) => {
		setAll({
			category: {
				id: product.category?.id || (product.subCategory?.id as string),
				title:
					product.category?.title ||
					(product.subCategory?.title as string),
				sub: product.category ? false : true,
			},
			id: product.id,
			image: product.image,
			input: {
				description: product.description.join('\n\n'),
				name: product.name,
				price: product.price,
			},
			isEdit: true,
			size: product.size.map(({ id }) => id),
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
				onClick={onToggle}
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
							handlEdit={handlEdit}
						/>
					);
				})
			)}
			<AdminCreateSize isOpen={isOpenSize} onClose={onCloseSize} />
			<AdminCreateProduct isOpen={isOpen} onClose={onClose} />
		</Stack>
	);
};

export default AdminProducts;
