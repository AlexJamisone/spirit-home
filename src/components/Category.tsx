import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuItemOption,
	MenuGroup,
	MenuOptionGroup,
	MenuDivider,
	Link as ChakraLink,
	Button,
	Spinner,
} from '@chakra-ui/react';
import { IoIosArrowDown } from 'react-icons/io';
import Link from 'next/link';

import React from 'react';
import { api } from '~/utils/api';

const Category = () => {
	const { data: categories, isLoading } =
		api.categorys.getCategorys.useQuery();
	if (isLoading) return <Spinner />;
	if (!categories) return <div>No Categories yet!</div>;
	return (
		<Menu>
			<MenuButton as={Button} variant="ghost" rightIcon={<IoIosArrowDown />}>
				Категории
			</MenuButton>
			<MenuList>
				{categories.map(({ id, path, title }) => (
					<MenuItem key={id}>
						<ChakraLink
							as={Link}
							href={path}
							_hover={{ textDecoration: 'none' }}
						>
							{title}
						</ChakraLink>
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
};

export default Category;
