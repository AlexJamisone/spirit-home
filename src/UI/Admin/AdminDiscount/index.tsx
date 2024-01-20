import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import DiscountInputs from './DiscountInputs';

const AdminDiscount = () => {
	return (
		<Tabs isFitted variant={'enclosed'}>
			<TabList>
				<Tab>Создать</Tab>
				<Tab>Действующие</Tab>
			</TabList>
			<TabPanels>
				<DiscountInputs />
				<TabPanel>Existing</TabPanel>
			</TabPanels>
		</Tabs>
	);
};
export default AdminDiscount;
