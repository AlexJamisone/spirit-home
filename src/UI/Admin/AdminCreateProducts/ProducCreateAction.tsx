import { Button } from '@chakra-ui/react';
import { useCreateProduct } from '~/stores/useCreateProduct';
import { api } from '~/utils/api';

type ProducCreateActionProp = {
	onClose: () => void;
};

const ProducCreateAction = ({ onClose }: ProducCreateActionProp) => {
	const {
		id,
		isEdit,
		input: { description, name, price },
		category: { id: catId, sub },
		image,
		size,
		setClear,
	} = useCreateProduct();
	const { mutate: create, isLoading: isLoadingCreate } =
		api.products.create.useMutation();
	const { mutate: update, isLoading: isLoadingUpdate } =
		api.products.update.useMutation();

	const handlProductAction = () => {
		if (isEdit) {
			update({
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
			});
		} else {
			create({
				category: {
					id: catId,
					sub,
				},
				description: description.split(/\n/g),
				image,
				name,
				price,
				size,
			});
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
