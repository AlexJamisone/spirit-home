import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Select,
} from '@chakra-ui/react';
import React, { type ChangeEvent } from 'react';
import { useCreateProduct } from '~/stores/useCreateProduct';
import { api } from '~/utils/api';

const CategoriesSelector = () => {
	const { data: categories } = api.categorys.get.useQuery();
	const {
		setCategory,
		error,
		reset,
		category: { title },
	} = useCreateProduct();
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
		setCategory({ title: seletedValue, id: selectedId, sub: isSubTitle });
	};
	return (
		<FormControl
			isInvalid={error?.isError && error?.msg.category !== undefined}
		>
			<FormLabel>Категория</FormLabel>
			<Select
				placeholder="Выбери категорию"
				onChange={(e) => {
					reset();
					handlChangeSelect(e);
				}}
				defaultValue={title}
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
			<FormErrorMessage fontWeight={600}>
				{error?.msg?.category}
			</FormErrorMessage>
		</FormControl>
	);
};

export default CategoriesSelector;
