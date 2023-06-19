import { FormLabel, Select } from '@chakra-ui/react';
import React, { type ChangeEvent } from 'react';
import { useCreateProductContext } from '~/context/createProductContext';
import { api } from '~/utils/api';

const CategoriesSelector = () => {
	const { dispatch, form } = useCreateProductContext();
	const { data: categories } = api.categorys.get.useQuery();
	const handlChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		const seletedValue = e.target.value;
		let selectedId = '';
		let isSubTitle = false;
		categories?.forEach(({ id, title, subCategory }) => {
			if (subCategory.length !== 0) {
				subCategory.forEach(({ id: subId, title: subTitle }) => {
					if (subTitle === seletedValue) {
						selectedId = subId;
						isSubTitle = true;
					}
				});
			} else if (title === seletedValue) {
				selectedId = id;
			}
		});
		dispatch({
			type: 'SET_CATEG',
			payload: { title: seletedValue, id: selectedId, sub: isSubTitle },
		});
	};
	return (
		<>
			<FormLabel>Категория</FormLabel>
			<Select
				placeholder="Выбери категорию"
				onChange={(e) => handlChangeSelect(e)}
				defaultValue={form.category.title}
			>
				{categories?.map(({ id, title, subCategory }) => (
					<React.Fragment key={id}>
						{subCategory.length !== 0 ? (
							subCategory.map(({ id, title }) => (
								<option key={id}>{title}</option>
							))
						) : (
							<option>{title}</option>
						)}
					</React.Fragment>
				))}
			</Select>
		</>
	);
};

export default CategoriesSelector;
