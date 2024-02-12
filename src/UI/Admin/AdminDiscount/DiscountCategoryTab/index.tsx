import { Checkbox, Stack, TabPanel } from '@chakra-ui/react';
import TabsErros from '~/components/TabsErros';
import { useDiscount } from '~/stores/useDiscount';
import { useHelper } from '~/stores/useHelpers';
import { api } from '~/utils/api';

const DiscountCategoryTab = () => {
	const { data: categorys } = api.categorys.getCategoryForDiscount.useQuery();
	const catIds = useHelper((state) => state.categotys.ids);
	const setCatIds = useHelper((state) => state.setCatId);
	const reset = useDiscount((state) => state.reset);
	const isError = useDiscount((state) => state.error?.isError);
	const err = useDiscount((state) => state.error?.error);
	const handlChange = (id: string) => {
		reset();
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
								isInvalid={
									isError && err?.['path'] !== undefined
								}
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
									isInvalid={
										isError && err?.['path'] !== undefined
									}
								>
									{subcateg.title}
								</Checkbox>
							))}
					</Stack>
				))}
				<TabsErros />
			</Stack>
		</TabPanel>
	);
};
export default DiscountCategoryTab;
