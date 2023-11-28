import { Stack } from '@chakra-ui/react';
import { useCategory } from '~/stores/useCategory';
import AdminCategoryCards from './AdminCategoryCards';
import AdminCategoryInputs from './AdminCategoryInputs';
import AdminSubCategoryInputs from './AdminSubCategoryInputs';

const AdminCategory = () => {
	const {
		category: {
			edit: { isSelected },
		},
	} = useCategory();
	return (
		<Stack maxW={500}>
			<AdminCategoryInputs />
			<AdminCategoryCards />
			{isSelected && <AdminSubCategoryInputs />}
		</Stack>
	);
};

export default AdminCategory;
