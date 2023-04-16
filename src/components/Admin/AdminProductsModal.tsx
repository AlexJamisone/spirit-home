/* eslint-disable @typescript-eslint/no-misused-promises */
import {
	Button,
	FormControl,
	FormLabel,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Spinner,
	Stack,
	Textarea,
	useDisclosure,
	useToast,
	IconButton,
	Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import type { Action, FormProductState } from '~/reducer/FormReducer';
import { api } from '~/utils/api';
import DragDrop from '../Drag&Drop';
import AdminProductsAlert from './AdminProductsAlert';
import { TiDeleteOutline } from 'react-icons/ti';
import type { UploadResult } from '~/utils/uploadImage';
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

	const { mutate: deletImg } = api.products.deletImage.useMutation();

	useEffect(() => {
		dispatch({ type: 'SET_CATEG', payload: categories?.[0]?.title ?? '' });
	}, []);

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
					name: form.name,
					price: form.price,
					quantity: form.quantity,
					image: form.image.map((item) => item.path),
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
					image: form.image.map((item) => item.path),
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
					onError: ({ data }) => {
						const errorMessage =
							data?.zodError?.fieldErrors?.description;
						toast({
							description: `Ошибка: ${
								errorMessage?.[0] as string
							}`,
							status: 'error',
							isClosable: true,
							duration: 10000,
						});
					},
				}
			);
		}
	};

	const handlDeletImage = (path: UploadResult, index: number) => {
		deletImg([path], {
			onSuccess: () => {
				toast({
					description: `Картинка удалена`,
					status: 'warning',
					isClosable: true,
				});
				const updateImages = form.image.filter((_, i) => i !== index);
				dispatch({
					type: 'SET_IMG',
					payload: updateImages,
				});
			},
		});
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
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			closeOnOverlayClick={false}
			closeOnEsc={false}
			onEsc={() => {
				if (edit) {
					dispatch({ type: 'SET_CLEAR' });
					setEdit(false);
					onClose();
				} else {
					toggleAlert();
				}
			}}
		>
			<ModalOverlay />
			<ModalContent w={['500px']} maxW={'100%'}>
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
							{form.image.length === 0 ? null : (
								<Stack
									direction="row"
									flexWrap="wrap"
									gap={5}
									justifyContent="center"
								>
									{form.image.map((src, index) => (
										<Stack key={index} position="relative">
											<IconButton
												variant="ghost"
												as={motion.button}
												initial={{
													opacity: 0,
													rotate: 180,
												}}
												animate={{
													opacity: 1,
													rotate: 0,
													transition: {
														type: 'just',
														duration: 0.5,
														delay: 1,
													},
												}}
												position="absolute"
												right={-5}
												top={-2}
												size="sm"
												aria-label="deletImg"
												icon={
													<Icon
														as={TiDeleteOutline}
														color="red.500"
														boxSize={7}
													/>
												}
												onClick={() =>
													handlDeletImage(src, index)
												}
											/>
											<Image
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transitionDuration="0.5s"
												as={motion.img}
												objectFit="cover"
												fallback={<Spinner />}
												src={`${
													process.env
														.NEXT_PUBLIC_SUPABASE_URL as string
												}/storage/v1/object/public/products/${
													src.path
												}`}
												alt="product"
												width={200}
												height={200}
											/>
										</Stack>
									))}
								</Stack>
							)}
							<DragDrop
								form={form}
								edit={edit}
								dispatch={dispatch}
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
								defaultValue={
									edit
										? form.category
										: categories?.[0]?.title
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
									onClick={() => {
										if (form.image.length === 0) {
											dispatch({ type: 'SET_CLEAR' });
											onClose();
										} else {
											toggleAlert();
										}
									}}
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
