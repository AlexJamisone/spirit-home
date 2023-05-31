import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { IoIosArrowDown } from 'react-icons/io';

import { api } from '~/utils/api';
import Placholder from '../NoData/Placholder';
import CategoryMenuInner from './CategoryMenuInner';

const CategoryMenu = () => {
	const { data: categories, isLoading } = api.categorys.get.useQuery();
	return (
		<Menu autoSelect={false}>
			{({ onClose }) => (
				<>
					<MenuButton
						as={Button}
						variant="ghost"
						rightIcon={<IoIosArrowDown />}
						size={['xs', 'sm', 'md']}
					>
						Категории
					</MenuButton>
					<MenuList
						position="relative"
						zIndex={30}
						mt={[3, null]}
						p={1}
					>
						{isLoading ? (
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
						) : null}
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
