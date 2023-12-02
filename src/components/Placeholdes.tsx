import { Skeleton, Stack } from '@chakra-ui/react';

const Placeholdes = ({ quantity }: { quantity: number }) => {
	const placeholders = new Array(quantity)
		.fill(0)
		.map((_, index) => index + 1);
	return (
		<Stack direction="row" gap={10} justifyContent="center">
			{placeholders.map((id) => (
				<Skeleton key={id} w={292} h={450} rounded="3xl" />
			))}
		</Stack>
	);
};

export default Placeholdes;
