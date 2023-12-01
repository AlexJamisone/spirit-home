import { Button, Stack } from '@chakra-ui/react';
import type { Size } from '@prisma/client';
import { useCreateProduct } from '~/stores/useCreateProduct';

type SizeCardProps = {
	size: Size;
};

const SizeCard = ({ size }: SizeCardProps) => {
	const { setSize, size: sizes } = useCreateProduct();
	return (
		<Stack w={'60px'}>
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
