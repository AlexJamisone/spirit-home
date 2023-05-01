import { Button } from '@chakra-ui/react';
import { useCreateProductContext } from '~/context/createProductContext';
import AdminProductsAlert from '../AdminProductsAlert';

const ProducCreateAction = () => {
	const { dispatch, onClose, toggleAlert, setEdit, edit, isLoading, form } =
		useCreateProductContext();
	return (
		<>
			<Button type="submit" isLoading={isLoading}>
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
			<AdminProductsAlert />
		</>
	);
};

export default ProducCreateAction;
