import {
	Button,
	Link as ChakraLink,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spinner
} from '@chakra-ui/react';
import Link from 'next/link';
import { IoIosArrowDown } from 'react-icons/io';

import { api } from '~/utils/api';

const Category = () => {
	const { data: categories, isLoading } =
		api.categorys.getCategorys.useQuery();

	return (
		<Menu>
			<MenuButton
				as={Button}
				variant="ghost"
				rightIcon={<IoIosArrowDown />}
				
			>
				Категории
			</MenuButton>
			<MenuList>
				{categories?.map(({ id, path, title }) =>
					isLoading ? (
						<Spinner key={id} />
					) : (
						<MenuItem key={id}>
							<ChakraLink
								as={Link}
								href={`/categories/${path}`}
								_hover={{ textDecoration: 'none' }}
							>
								{title}
							</ChakraLink>
						</MenuItem>
					)
				)}
			</MenuList>
		</Menu>
	);
};

export default Category;
