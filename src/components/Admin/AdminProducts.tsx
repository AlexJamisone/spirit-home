import {
	Box,
	Button,
	Icon,
	IconButton,
	Image,
	Spinner,
	Stack,
	Tag,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import type { Product } from '@prisma/client';
import { useReducer, useState } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FormProductReducer, initialState } from '~/reducer/FormReducer';
import { api } from '~/utils/api';
import AdminProductsModal from './AdminProductsModal';
import { RiEdit2Fill } from 'react-icons/ri';

const AdminProducts = () => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const [edit, setEdit] = useState(false);
	const [form, dispatch] = useReducer(FormProductReducer, initialState);
	const toast = useToast();

	const ctx = api.useContext();
	const { data: products } = api.products.get.useQuery();
	const { mutate: deleteProducts, isLoading } =
		api.products.delete.useMutation();

	if (!products) return null;

	const handleDelet = (id: string, path: string, name: string) => {
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
	};
	const handlEdit = (product: Product) => {
		setEdit(true);
		dispatch({
			type: 'SET_ALL',
			payload: {
				id: product.id,
				category: product.categoryTitle as string,
				description: product.description,
				image: product.image as string,
				name: product.name,
				price: product.price,
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
				products.map((product) => {
					const {
						id,
						categoryTitle,
						description,
						image,
						name,
						price,
						quantity,
					} = product;
					return (
						<Stack
							key={id}
							maxW={['300px']}
							h={['350px']}
							direction="column"
							justifyContent="center"
							alignItems="center"
							p={5}
							border="1px solid #CBD5E0"
							rounded="3xl"
							boxShadow="2xl"
							_hover={{
								transform: 'scale(1.1)',
							}}
							cursor="pointer"
							transition="all 0.1s linear"
							position="relative"
							zIndex={-0}
						>
							{isLoading ? (
								<>
									<Box
										position="absolute"
										w="100%"
										height="100%"
										top={0}
										left={0}
										zIndex={20}
										bgColor="whiteAlpha.600"
										rounded="3xl"
									></Box>
									<Spinner
										position="absolute"
										zIndex={20}
										size="xl"
									/>
								</>
							) : null}
							<Stack
								direction={['row']}
								position="relative"
								justifyContent="center"
								w="100%"
							>
								<Image
									src={`${
										process.env
											.NEXT_PUBLIC_SUPABASE_URL as string
									}/storage/v1/object/public/products/${
										image as string
									}`}
									alt={name}
									objectFit="cover"
									width={100}
									height={100}
								/>
								<IconButton
									icon={
										<Icon
											as={BsTrashFill}
											color="red.400"
										/>
									}
									aria-label="deletButton"
									size="sm"
									position="absolute"
									top={0}
									right={0}
									zIndex={10}
									onClick={() =>
										handleDelet(id, image as string, name)
									}
								/>
								<IconButton
									icon={
										<Icon
											as={RiEdit2Fill}
											color="cyan.600"
										/>
									}
									aria-label="editButton"
									size="sm"
									position="absolute"
									top={10}
									right={0}
									zIndex={10}
									onClick={() => handlEdit(product)}
								/>
							</Stack>
							<Stack fontSize={16} textAlign="center">
								<Text>{name}</Text>
								<Text
									fontSize={12}
									textColor={'gray.500'}
									maxH="100px"
									overflow="hidden"
								>
									{description}
								</Text>
							</Stack>
							<Tag>{categoryTitle}</Tag>
							<Stack dir="row">
								<Text>{`${price} ₽`}</Text>
								<Text>{`${quantity} шт`}</Text>
							</Stack>
						</Stack>
					);
				})
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
