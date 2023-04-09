/* eslint-disable @typescript-eslint/no-misused-promises */
import {
	Button,
	Center,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Stack,
	Textarea,
	useToast,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useReducer, type ChangeEvent } from 'react';
import { api } from '~/utils/api';
import { uploadImages } from '~/utils/uploadImage';
import {
	FormProductReducer,
	initialState
} from '~/reducer/FormReducer';

type AdminProductsModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const AdminProductsModal = ({ isOpen, onClose }: AdminProductsModalProps) => {

	const [form, dispatch] = useReducer(FormProductReducer, initialState);

	const ctx = api.useContext();
	const toast = useToast();

	const { data: categories } = api.categorys.get.useQuery();
	const { mutate: create, isLoading } = api.products.create.useMutation();

	const handelUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
		let file: File | undefined;
		const { data, error } = await uploadImages(file, e);
		if (!data) return null;
		if (error) {
			toast({
				description: `Ошибка: ${error.message}`,
				isClosable: true,
				duration: 5000,
				status: 'error',
			});
		}
		dispatch({ type: 'SET_IMG', payload: data.path });
	};
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		switch (name) {
			case 'name':
				dispatch({ type: 'SET_NAME', payload: value });
				break;
			case 'price':
				dispatch({ type: 'SET_PRICE', payload: Number(value) });
				break;
			case 'quantity':
				dispatch({ type: 'SET_QT', payload: Number(value) });
				break;
			default:
				break;
		}
	};
	const handleSubmit = () => {
		create(
			{
				name: form.name,
				description: form.description,
				category: form.category,
				image: form.image,
				price: form.price,
				quantity: form.quantity,
			},
			{
				onSuccess: () => {
					toast({
						description: `Товар ${form.name} создан!🤙`,
						status: 'success',
						isClosable: true,
					});
					dispatch({ type: 'SET_CLEAR', payload: initialState });
					void ctx.products.invalidate();
					onClose();
				},
			}
		);
	};
	const formInfo = [
		{
			type: 'text',
			placeholder: 'Название товара',
			value: form.name,
			name: 'name',
		},
		{
			type: 'text',
			placeholder: 'Описание товара',
			value: form.description,
			name: 'description',
			textaria: true,
		},
		{
			type: 'number',
			placeholder: 'Цена, ₽',
			value: form.price,
			name: 'price',
		},
		{
			type: 'number',
			placeholder: 'Количество, шт',
			value: form.quantity,
			name: 'quantity',
		},
	];

	console.log(form);
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Создать новый товар</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl
						as="form"
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit();
						}}
					>
						<Stack gap={3}>
							{form.image !== '' ? (
								<Center>
									<Image
										src={`${
											process.env
												.NEXT_PUBLIC_SUPABASE_URL as string
										}/storage/v1/object/public/products/${
											form.image
										}`}
										alt="product"
										width={200}
										height={200}
									/>
								</Center>
							) : null}
							<Input
								type="file"
								onChange={(e) => handelUploadImage(e)}
							/>
							{formInfo.map(
								({
									placeholder,
									type,
									value,
									name,
									textaria,
								}) => (
									<Stack key={placeholder}>
										<FormLabel>{placeholder}</FormLabel>
										{textaria ? (
											<Textarea
												placeholder={placeholder}
												value={value}
												h="200px"
												onChange={(e) =>
													dispatch({
														type: 'SET_DESCR',
														payload: e.target.value,
													})
												}
											/>
										) : (
											<Input
												placeholder={placeholder}
												type={type}
												value={value}
												name={name}
												onChange={handleInputChange}
											/>
										)}
									</Stack>
								)
							)}
							<FormLabel>Категория</FormLabel>
							<Select
								onChange={(e) =>
									dispatch({
										type: 'SET_CATEG',
										payload: e.target.value,
									})
								}
							>
								{categories?.map(({ id, title }) => (
									<option key={id} value={title}>
										{title}
									</option>
								))}
							</Select>
						</Stack>
						<ModalFooter gap={5}>
							<Button type="submit" isLoading={isLoading}>
								Сохранить
							</Button>
							<Button onClick={() => onClose()}>Отмена</Button>
						</ModalFooter>
					</FormControl>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default AdminProductsModal;
