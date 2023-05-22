import { Button, FormControl, Stack } from '@chakra-ui/react';
import { useNewOrderContext } from '~/context/orderContext';

const NewOrderAction = () => {
	const { isLoading, onClose, dispatch, handlSubmit } = useNewOrderContext();
	return (
		<Stack>
			<FormControl
				as="form"
				onSubmit={(e) => {
					e.preventDefault();
					handlSubmit();
				}}
				display="flex"
				gap={5}
			>
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
			</FormControl>
		</Stack>
	);
};

export default NewOrderAction;
