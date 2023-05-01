/* eslint-disable @typescript-eslint/no-misused-promises */
import {
	FormControl,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import type { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react';
import CreateProductContext from '~/context/createProductContext';
import type { Action, FormProductState } from '~/reducer/FormReducer';
import { api } from '~/utils/api';
import type { UploadResult } from '~/utils/uploadImage';

type AdminProductsModalProps = {
	isOpen: boolean;
	onClose: () => void;
	edit: boolean;
	form: FormProductState;
	dispatch: Dispatch<Action>;
	setEdit: Dispatch<SetStateAction<boolean>>;
	images?: ReactNode;
	inputs?: ReactNode;
	action?: ReactNode;
	drag?: ReactNode;
	categories?: ReactNode;
};

const AdminProductsModal = ({
	isOpen,
	onClose,
	edit,
	form,
	dispatch,
	setEdit,
	action,
	drag,
	images,
	inputs,
	categories,
}: AdminProductsModalProps) => {
	const {
		isOpen: openAlert,
		onClose: onCloseAlert,
		onToggle: toggleAlert,
	} = useDisclosure();
	const ctx = api.useContext();
	const toast = useToast();

	const { mutate: create, isLoading: isLoadingCreate } =
		api.products.create.useMutation();
	const { mutate: update, isLoading: isLoadingUpdate } =
		api.products.update.useMutation();

	const { mutate: deletImg } = api.products.deletImage.useMutation();

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
			<CreateProductContext.Provider
				value={{
					isLoading: isLoadingCreate || isLoadingUpdate,
					dispatch,
					form,
					edit,
					handlDeletImage,
					handleInputChange,
					onClose,
					onCloseAlert,
					openAlert,
					path: form.image,
					setEdit,
					toggleAlert,
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
								{images}
								{drag}
								{inputs}
								{categories}
							</Stack>
							<ModalFooter gap={5}>{action}</ModalFooter>
						</FormControl>
					</ModalBody>
				</ModalContent>
			</CreateProductContext.Provider>
		</Modal>
	);
};

export default AdminProductsModal;
