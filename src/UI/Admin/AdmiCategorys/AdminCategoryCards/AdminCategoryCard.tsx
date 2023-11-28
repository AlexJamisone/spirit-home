import { Icon, IconButton, Stack, Text, useDisclosure } from '@chakra-ui/react';
import type { Category, SubCategory } from '@prisma/client';
import type { IconType } from 'react-icons';
import { MdDelete, MdOutlineAdd, MdOutlineEdit } from 'react-icons/md';
import { useCategory } from '~/stores/useCategory';
import AdminAlert from '../AdminAlert';
import AdminSubCategoryCard from './AdminSubCategoryCard';

type AdminCategoryCardProps = {
	category: Category & {
		subCategory: SubCategory[];
	};
};
const AdminCategoryCard = ({ category }: AdminCategoryCardProps) => {
	const { isOpen, onToggle, onClose } = useDisclosure();
	const {
		category: {
			edit: { categoryId, isSelected },
		},
		setCategoryEdit,
	} = useCategory();
	const handlButton = (
		icon: IconType,
		action: () => void,
		label: 'add' | 'edit' | 'delet'
	) => {
		return (
			<IconButton
				size="xs"
				aria-label={label}
				icon={<Icon as={icon} />}
				colorScheme={
					label === 'add' ? 'teal' : label === 'edit' ? 'cyan' : 'red'
				}
				onClick={action}
			/>
		);
	};
	const selectCategory = isSelected && categoryId === category.id;
	return (
		<Stack
			boxShadow="2xl"
			p={3}
			rounded="3xl"
			border={selectCategory ? '1px solid' : undefined}
			borderColor={selectCategory ? 'green.400' : undefined}
		>
			<Stack direction="row">
				{handlButton(
					MdOutlineAdd,
					() => {
						setCategoryEdit({
							isEdit: false,
							categoryId: category.id,
							isSelected: true,
						});
					},
					'add'
				)}
				<Text>{category.title}</Text>
				{handlButton(
					MdOutlineEdit,
					() =>
						setCategoryEdit({
							isEdit: true,
							categoryId: category.id,
							isSelected: false,
						}),
					'edit'
				)}
				{handlButton(
					MdDelete,
					() => {
						setCategoryEdit({
							isEdit: false,
							categoryId: category.id,
							isSelected: false,
						});
						onToggle();
					},
					'delet'
				)}
			</Stack>
			{category.subCategory.map((subCategory) => (
				<AdminSubCategoryCard
					id={category.id}
					key={subCategory.id}
					subCategory={subCategory}
				/>
			))}
			<AdminAlert
				isOpen={isOpen}
				onClose={onClose}
				header="Удалить категорию?"
				body="Потвердите удаление категории, все подкатегории внутри категории тоже будут удалены 👾"
			/>
		</Stack>
	);
};

export default AdminCategoryCard;
