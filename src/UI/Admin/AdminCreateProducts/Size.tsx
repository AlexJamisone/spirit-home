import { Stack } from '@chakra-ui/react';
import { useCreateProductContext } from '~/context/createProductContext';
import SizeCard from './SizeCard';

const Size = () => {
	const { size } = useCreateProductContext();
	return (
		<Stack direction="row" flexWrap="wrap" justifyContent="center">
			{size?.map((size) => (
				<SizeCard size={size} key={size.id} />
			))}
		</Stack>
	);
};

export default Size;
