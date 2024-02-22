import {
	Button,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';

import { IoIosArrowDown } from 'react-icons/io';
import Placholder from '~/components/NoData/Placholder';
import { api } from '~/utils/api';
import CategoryMenuInner from './CategoryMenuInner';

const CategoryMenu = () => {
	const { data: categories, isLoading } = api.categorys.get.useQuery();
	return (
		<Menu autoSelect={false} placement={'bottom-start'}>
			{({ onClose, isOpen }) => (
				<>
					<MenuButton
						as={Button}
						variant="ghost"
						rightIcon={
							<Icon
								transition="all .5s ease"
								transform={
									isOpen ? 'rotate(0)' : 'rotate(-90deg)'
								}
								as={IoIosArrowDown}
							/>
						}
						size={['xs', 'sm']}
						textColor="second"
						fontWeight={400}
					>
						<Text fontFamily={`"Alata", sans-serif;`}>
							Категории
						</Text>
					</MenuButton>
					<MenuList
						position="relative"
						zIndex={30}
						p={1}
						minW={['150px', null]}
						borderRadius="none"
						borderBottomRightRadius="25px"
						border="none"
					>
						{isLoading && (
							<>
								<MenuItem>
									<Placholder />
								</MenuItem>
								<MenuItem>
									<Placholder />
								</MenuItem>
								<MenuItem>
									<Placholder />
								</MenuItem>
							</>
						)}
						{categories?.map(({ id, title, subCategory, path }) => (
							<CategoryMenuInner
								key={id}
								title={title}
								subCategory={subCategory}
								path={path}
								closeMain={onClose}
							/>
						))}
					</MenuList>
				</>
			)}
		</Menu>
	);
};

export default CategoryMenu;
