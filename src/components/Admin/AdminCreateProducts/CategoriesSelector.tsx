import { FormLabel, Select } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useCreateProductContext } from '~/context/createProductContext';
import { api } from '~/utils/api';

const CategoriesSelector = () => {
	const { dispatch, edit, form } = useCreateProductContext();
	const { data: categories } = api.categorys.getSubCat.useQuery();

	useEffect(() => {
		dispatch({ type: 'SET_CATEG', payload: categories?.[0]?.title ?? '' });
	}, []);
	return (
		<>
			<FormLabel>Категория</FormLabel>
			<Select
				onChange={(e) =>
					dispatch({
						type: 'SET_CATEG',
						payload: e.target.value,
					})
				}
				defaultValue={edit ? form.category : categories?.[0]?.title}
			>
				{categories?.map(({ id, title }) => (
					<option key={id} value={title}>
						{title}
					</option>
				))}
			</Select>
		</>
	);
};

export default CategoriesSelector;
