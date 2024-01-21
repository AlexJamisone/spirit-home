import { Tab, TabList,  TabPanels, Tabs } from "@chakra-ui/react"
import ProductsTab from "./ProuctsTab"
import DiscountCategoryTab from "../DiscountCategoryTab"

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
                <DiscountCategoryTab/>
            </TabPanels>
        </Tabs>
    )
}
export default DiscountSearchTab
