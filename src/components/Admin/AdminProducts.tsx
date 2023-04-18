import {
	Button,
	Icon,
	Stack,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import type { Product, ProductPriceHistory } from '@prisma/client';
import { useReducer, useState, type SyntheticEvent } from 'react';

import { IoIosAddCircleOutline } from 'react-icons/io';
import { FormProductReducer, initialState } from '~/reducer/FormReducer';
import { api } from '~/utils/api';
import type { UploadResult } from '~/utils/uploadImage';
import ProductsCard from '../ProductsCard';
import AdminProductsModal from './AdminProductsModal';

const AdminProducts = () => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const [edit, setEdit] = useState(false);
	const [form, dispatch] = useReducer(FormProductReducer, initialState);

	const toast = useToast();

	const ctx = api.useContext();
	const { data: user } = api.users.get.useQuery();
	const { data: products } = api.products.get.useQuery();
	const { mutate: deleteProducts, isLoading } =
		api.products.delete.useMutation();

	if (!products) return null;

	const handleDelet = (
		id: string,
		path: UploadResult[],
		name: string,
		e: SyntheticEvent
	) => {
		deleteProducts(
			{
				id,
				path,
			},
			{
				onSuccess: () => {
					toast({
						description: `Товар ${name} успешно удалён!🚀`,
						status: 'info',
						isClosable: true,
					});
					void ctx.products.invalidate();
				},
				onError: () => {
					toast({
						description: `Ошбка с удалением ❌`,
						status: 'error',
						isClosable: true,
					});
				},
			}
		);
		e.stopPropagation();
	};
	const handlEdit = (
		product: Product & { priceHistory: ProductPriceHistory[] }
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
				quantity: product.quantity,
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
								isLoading={isLoading}
								handlEdit={handlEdit}
								handleDelet={handleDelet}
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
			/>
		</Stack>
	);
};

export default AdminProducts;
