import { Button, useToast } from '@chakra-ui/react';
import { useCreateProduct } from '~/stores/useCreateProduct';
import { api } from '~/utils/api';

type ProducCreateActionProp = {
	onClose: () => void;
};

const ProducCreateAction = ({ onClose }: ProducCreateActionProp) => {
	const id = useCreateProduct((state) => state.id);
	const isEdit = useCreateProduct((state) => state.isEdit);
	const description = useCreateProduct((state) => state.input.description);
	const name = useCreateProduct((state) => state.input.name);
	const price = useCreateProduct((state) => state.input.price);
	const catId = useCreateProduct((state) => state.category.id);
	const sub = useCreateProduct((state) => state.category.sub);
	const image = useCreateProduct((state) => state.image);
	const size = useCreateProduct((state) => state.size);
	const setClear = useCreateProduct((state) => state.setClear);
	const setError = useCreateProduct((state) => state.setError);
	const toast = useToast();
	const ctx = api.useContext();
	const { mutate: create, isLoading: isLoadingCreate } =
		api.products.create.useMutation();
	const { mutate: update, isLoading: isLoadingUpdate } =
		api.products.update.useMutation();

	const handlProductAction = () => {
		if (isEdit) {
			update(
				{
					category: {
						id: catId,
						sub,
					},
					description: description.split(/\n/g),
					name,
					image,
					id,
					price,
					size,
				},
				{
					onSuccess: () => {
						void ctx.products.invalidate();
						toast({
							description: 'Продукт успешно обновлён!',
							status: 'info',
							isClosable: true,
							duration: 3000,
						});
						onClose();
					},
				}
			);
		} else {
			create(
				{
					category: {
						id: catId,
						sub,
					},
					description: description.split(/\n/g),
					image,
					name,
					price,
					size,
				},
				{
					onSuccess: () => {
						void ctx.products.invalidate();
						toast({
							description: 'Товар успешно создан!',
							status: 'success',
							isClosable: true,
						});
						onClose();
					},
					onError: (error) => {
						const err = error.data?.zodError?.fieldErrors;
						if (err) {
							setError({
								isError: true,
								msg: err,
							});
						} else {
							toast({
								description: error.message,
								status: 'error',
								isClosable: true,
							});
						}
					},
				}
			);
		}
	};
	return (
		<>
			<Button
				isLoading={isEdit ? isLoadingUpdate : isLoadingCreate}
				onClick={handlProductAction}
			>
				{isEdit ? 'Обновить' : 'Сохранить'}
			</Button>
			<Button
				onClick={() => {
					setClear();
					onClose();
				}}
			>
				Отмена
			</Button>
		</>
	);
};

export default ProducCreateAction;
