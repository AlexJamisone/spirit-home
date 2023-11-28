import { Stack } from '@chakra-ui/react';
import { api } from '~/utils/api';
import AdminCategoryCard from './AdminCategoryCard';

const AdminCategoryCards = () => {
	const { data: categorys } = api.categorys.get.useQuery();
	if (!categorys) return null;
	return (
		<Stack direction="row" flexWrap="wrap" justifyContent="center" gap={5}>
			{categorys.map((category) => (
				<AdminCategoryCard key={category.id} category={category} />
			))}
		</Stack>
	);
};

export default AdminCategoryCards;
