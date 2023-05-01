import { AbsoluteCenter, Spinner, Stack } from '@chakra-ui/react';
import { api } from '~/utils/api';
import SizeList from './Size/SizeList';

const CreateSize = () => {
	const { isLoading } = api.size.get.useQuery();
	return (
		<>
			<Stack
				direction="row"
				flexWrap="wrap"
				justifyContent="flex-start"
				alignItems="flex-start"
				position="relative"
			>
				{isLoading ? (
					<AbsoluteCenter>
						<Spinner />
					</AbsoluteCenter>
				) : (
					<SizeList />
				)}
			</Stack>
		</>
	);
};

export default CreateSize;
