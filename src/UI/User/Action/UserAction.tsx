import { Button } from '@chakra-ui/react';
import { useUserMainContext } from '~/context/userMainContext';

const UserAction = () => {
	const { handlAdd } = useUserMainContext();
	return (
		<Button
			size={['sm', 'md']}
			variant="outline"
			onClick={handlAdd}
			w={['50%', '100%']}
		>
			Добавить Адрес
		</Button>
	);
};

export default UserAction;
