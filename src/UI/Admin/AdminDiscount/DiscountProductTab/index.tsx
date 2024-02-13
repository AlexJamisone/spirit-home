import { Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';
import DiscountCategoryTab from '../DiscountCategoryTab';
import ProductsTab from './ProuctsTab';

const DiscountProudctTab = () => {
	return (
		<Tabs>
			<TabList>
				<Tab>Продукты</Tab>
				<Tab>Категории</Tab>
			</TabList>
			<TabPanels>
				<ProductsTab />
				<DiscountCategoryTab />
			</TabPanels>
		</Tabs>
	);
};
export default DiscountProudctTab;
