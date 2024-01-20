import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import ProductsTab from "./ProuctsTab"

const DiscountSearchTab = () => {
    return (
        <Tabs>
            <TabList>
                <Tab>
                    Продукты
                </Tab>
                <Tab>
                    Категории
                </Tab>
            </TabList>
            <TabPanels>
                <ProductsTab/>
                <TabPanel>
                    Здесь категории
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}
export default DiscountSearchTab
