import { Button, Stack } from '@chakra-ui/react';
import type { Size } from '@prisma/client';
import { useCreateProductContext } from '~/context/createProductContext';

type SizeCardProps = {
	size: Size;
};

const SizeCard = ({ size }: SizeCardProps) => {
	const { dispatch, form } = useCreateProductContext();
	return (
		<Stack w={'60px'}>
			<Button
				onClick={() => dispatch({ type: 'SET_SIZE', payload: size.id })}
				size="sm"
				isActive={form.size.includes(size.id)}
			>
				{size.value}
			</Button>
		</Stack>
	);
};

export default SizeCard;
