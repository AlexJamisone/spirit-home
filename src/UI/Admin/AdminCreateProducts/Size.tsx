import { Stack } from '@chakra-ui/react';
import { api } from '~/utils/api';
import SizeCard from './SizeCard';

const Size = () => {
	const { data: sizes } = api.size.get.useQuery();
	if (!sizes) return null;
	return (
		<Stack direction="row" flexWrap="wrap" justifyContent="center">
			{sizes.map((size) => (
				<SizeCard size={size} key={size.id} />
			))}
		</Stack>
	);
};

export default Size;
