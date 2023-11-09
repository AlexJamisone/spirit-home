import { Button } from '@chakra-ui/react';
import { useCreateProductContext } from '~/context/createProductContext';
import AdminProductsAlert from '../AdminProductsAlert';

const ProducCreateAction = () => {
	const { dispatch, onClose, toggleAlert, isLoading, form, reset } =
		useCreateProductContext();
	return (
		<>
			<Button type="submit" isLoading={isLoading}>
				{form.edit ? 'Обновить' : 'Сохранить'}
			</Button>
			{form.edit ? (
				<Button
					onClick={() => {
						onClose();
						dispatch({ type: 'SET_CLEAR' });
					}}
				>
					Отмена
				</Button>
			) : (
				<Button
					onClick={() => {
						if (form.image.length === 0) {
							reset();
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
