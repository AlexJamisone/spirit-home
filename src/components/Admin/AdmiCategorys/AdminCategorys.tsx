import { Stack } from '@chakra-ui/react';
import { useReducer, type ReactNode } from 'react';
import CategoryContext from '~/context/categoryCreateContext';
import {
	AdminCategorysReducer,
	initialState,
} from '~/reducer/AdminCategoryReducer';
import { api } from '~/utils/api';
import AdminCategoryCards from './AdminCategoryCards';
import AdminMainCategory from './AdminMainCategory';
import AdminSubCategory from './AdminSubCategory';
type AdminCategorysProps = {
	catCards?: ReactNode;
	subCategory?: ReactNode;
	mainCategory?: ReactNode;
};

const AdminCategorys = ({
	catCards,
	subCategory,
	mainCategory,
}: AdminCategorysProps) => {
	const [cat, dispatch] = useReducer(AdminCategorysReducer, initialState);

	const { data: categorys } = api.categorys.get.useQuery();
	const handleEdit = (id: string, title: string, path: string) => {
		dispatch({
			type: 'SET_ALL',
			payload: {
				...cat,
				title,
				path,
				id,
				controls: {
					edit: true,
					select: false,
				},
			},
		});
	};
	if (!categorys) return null;
	return (
		<CategoryContext.Provider
			value={{
				cat,
				categorys,
				dispatch,
				handleEdit,
			}}
		>
			<Stack
				direction="column"
				alignItems="center"
				w={['300px', '100%']}
				gap={5}
			>
				{mainCategory}
				{catCards}
				{subCategory}
			</Stack>
		</CategoryContext.Provider>
	);
};

AdminCategorys.Cards = AdminCategoryCards;
AdminCategorys.SubCat = AdminSubCategory;
AdminCategorys.MainCat = AdminMainCategory;

export default AdminCategorys;
