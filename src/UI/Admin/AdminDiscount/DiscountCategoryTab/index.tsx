import { Checkbox, Stack, TabPanel } from '@chakra-ui/react';
import { useHelper } from '~/stores/useHelpers';
import { api } from '~/utils/api';

const DiscountCategoryTab = () => {
	const { data: categorys } = api.categorys.getCategoryForDiscount.useQuery();
	const catIds = useHelper((state) => state.categotys.ids);
	const setCatIds = useHelper((state) => state.setCatId);
	const handlChange = (id: string) => {
		setCatIds(id);
	};
	return (
		<TabPanel>
			<Stack>
				{categorys?.map((category) => (
					<Stack key={category.id}>
						{category.subCategory.length === 0 && (
							<Checkbox
								onChange={() => handlChange(category.id)}
								isChecked={catIds.includes(category.id)}
							>
								{category.title}
							</Checkbox>
						)}
						{category.subCategory &&
							category.subCategory.map((subcateg) => (
								<Checkbox
									key={subcateg.id}
									onChange={() => handlChange(subcateg.id)}
									isChecked={catIds.includes(subcateg.id)}
								>
									{subcateg.title}
								</Checkbox>
							))}
					</Stack>
				))}
			</Stack>
		</TabPanel>
	);
};
export default DiscountCategoryTab;
