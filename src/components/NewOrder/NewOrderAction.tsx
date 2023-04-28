import { Button } from '@chakra-ui/react';
import { useNewOrderContext } from '~/context/orderContext';

const NewOrderAction = () => {
	const { isLoading, onClose, dispatch } = useNewOrderContext();
	return (
		<>
			<Button size={['sm', 'md']} type="submit" isLoading={isLoading}>
				Оформить
			</Button>
			<Button
				size={['sm', 'md']}
				onClick={() => {
					dispatch({ type: 'SET_CLEAR' });
					onClose();
				}}
			>
				Отмена
			</Button>
		</>
	);
};

export default NewOrderAction;
