/* eslint-disable @typescript-eslint/no-misused-promises */
import {
	Button,
	Center,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Stack,
	Textarea,
	useDisclosure,
	useToast,
	Image,
	Spinner,
} from '@chakra-ui/react';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { api } from '~/utils/api';
import { updateImage, uploadImages } from '~/utils/uploadImage';
import AdminProductsAlert from './AdminProductsAlert';
import { motion } from 'framer-motion';
import type { Action, FormProductState } from '~/reducer/FormReducer';

type AdminProductsModalProps = {
	isOpen: boolean;
	onClose: () => void;
	edit: boolean;
	form: FormProductState;
	dispatch: Dispatch<Action>;
	setEdit: Dispatch<SetStateAction<boolean>>;
};

const AdminProductsModal = ({
	isOpen,
	onClose,
	edit,
	form,
	dispatch,
	setEdit,
}: AdminProductsModalProps) => {
	const {
		isOpen: openAlert,
		onClose: onCloseAlert,
		onToggle: toggleAlert,
	} = useDisclosure();

	const ctx = api.useContext();
	const toast = useToast();

	const { data: categories } = api.categorys.get.useQuery();
	const { mutate: create, isLoading: isLoadingCreate } =
		api.products.create.useMutation();
	const { mutate: update, isLoading: isLoadingUpdate } =
		api.products.update.useMutation();

	const handelUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
		let file: File | undefined;
		if (edit) {
			const { data, error } = await updateImage(file, e, form.image);
			if (!data) return null;
			if (error?.name) {
				toast({
					description: `Ошибка: ${error.message}`,
					isClosable: true,
					duration: 5000,
					status: 'error',
				});
			}
			dispatch({ type: 'SET_IMG', payload: data.path });
		} else {
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
		}
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
		if (edit) {
			update(
				{
					category: form.category,
					description: form.description,
					id: form.id,
					image: form.image,
					name: form.name,
					price: form.price,
					quantity: form.quantity,
				},
				{
					onSuccess: () => {
						toast({
							description: `Обновление ${form.name} товара прошло успешно!🎉`,
							status: 'info',
						});
						dispatch({ type: 'SET_CLEAR' });
						void ctx.products.invalidate();
						onClose();
						setEdit(false);
					},
				}
			);
		} else {
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
						dispatch({ type: 'SET_CLEAR' });
						void ctx.products.invalidate();
						onClose();
					},
				}
			);
		}
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
	return (
		<Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Создать новый товар</ModalHeader>
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
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transitionDuration="0.5s"
										as={motion.img}
										fallback={<Spinner />}
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
								value={edit ? form.category : undefined}
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
							<Button
								type="submit"
								isLoading={
									edit ? isLoadingUpdate : isLoadingCreate
								}
							>
								{edit ? 'Обновить' : 'Сохранить'}
							</Button>
							{edit ? (
								<Button
									onClick={() => {
										onClose();
										dispatch({ type: 'SET_CLEAR' });
										setEdit(false);
									}}
								>
									Отмена
								</Button>
							) : (
								<Button
									onClick={() =>
										form.image === ''
											? onClose()
											: toggleAlert()
									}
								>
									Отмена
								</Button>
							)}
							<AdminProductsAlert
								isOpen={openAlert}
								onCloseAlert={onCloseAlert}
								path={form.image}
								onCloseModal={onClose}
								dispatch={dispatch}
							/>
						</ModalFooter>
					</FormControl>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default AdminProductsModal;
