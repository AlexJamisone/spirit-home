import { Button } from '@chakra-ui/react';
import type { SubCategory } from '@prisma/client';
import { useCategory } from '~/stores/useCategory';

type AdminSubCategoryCardProps = {
	subCategory: SubCategory;
	id: string;
};

const AdminSubCategoryCard = ({
	subCategory,
	id,
}: AdminSubCategoryCardProps) => {
	const {
		setCategoryEdit,
		setSubCategoryEdit,
		setSubCategoryInput,
		subCategory: {
			edit: { isEdit, subCategoryId },
		},
	} = useCategory();
	return (
		<Button
			onClick={() => {
				// setSelect(true);
				setCategoryEdit({
					categoryId: id,
					isEdit: false,
					isSelected: true,
				});
				setSubCategoryEdit({
					isEdit: true,
					subCategoryId: subCategory.id,
				});
				setSubCategoryInput({
					title: subCategory.title,
					path: subCategory.path,
				});
			}}
			isActive={isEdit && subCategory.id === subCategoryId}
		>
			{subCategory.title}
		</Button>
	);
};

export default AdminSubCategoryCard;
