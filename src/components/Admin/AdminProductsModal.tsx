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
import { useState, type ChangeEvent } from 'react';
import { api } from '~/utils/api';
import { uploadImages } from '~/utils/uploadImage';

type AdminProductsModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const AdminProductsModal = ({ isOpen, onClose }: AdminProductsModalProps) => {
	const [form, setForm] = useState({
		name: '',
		description: '',
		price: 0,
		image: '',
		category: '',
		quantity: 0,
	});
	const clearForm = () => {
		setForm({
			category: '',
			description: '',
			image: '',
			name: '',
			price: 0,
			quantity: 0,
		});
	};
	const ctx = api.useContext();
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
	const toast = useToast();
	const { data: categories } = api.categorys.get.useQuery();
	const { mutate: create, isLoading } = api.products.create.useMutation();
	const handelUpdateImage = async (e: ChangeEvent<HTMLInputElement>) => {
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
		setForm({ ...form, image: data.path });
	};
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: name === 'price' || name === 'quantity' ? +value : value,
		});
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
					clearForm();
					void ctx.products.invalidate();
					onClose();
				},
			}
		);
	};
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
								onChange={(e) => handelUpdateImage(e)}
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
													setForm({
														...form,
														description:
															e.target.value,
													})
												}
											/>
										) : (
											<Input
												placeholder={placeholder}
												type={type}
												value={value}
												name={name}
												onChange={(e) =>
													handleInputChange(e)
												}
											/>
										)}
									</Stack>
								)
							)}
							<FormLabel>Категория</FormLabel>
							<Select
								onChange={(e) =>
									setForm({
										...form,
										category: e.target.value,
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
