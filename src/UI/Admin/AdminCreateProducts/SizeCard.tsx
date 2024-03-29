import { Button, Stack } from '@chakra-ui/react';
import type { Size } from '@prisma/client';
import { useCreateProduct } from '~/stores/useCreateProduct';

type SizeCardProps = {
	size: Size;
};

const SizeCard = ({ size }: SizeCardProps) => {
	const sizes = useCreateProduct((state) => state.size);
	const setSize = useCreateProduct((state) => state.setSize);
	return (
		<Stack w={'fit-content'}>
			<Button
				onClick={() => setSize(size.id)}
				size="sm"
				isActive={sizes.includes(size.id)}
			>
				{size.value}
			</Button>
		</Stack>
	);
};

export default SizeCard;
