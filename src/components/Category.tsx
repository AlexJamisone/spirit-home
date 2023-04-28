import {
	Box,
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import Link from 'next/link';
import { IoIosArrowDown } from 'react-icons/io';

import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import Placholder from './NoData/Placholder';

const Category = () => {
	const { data: categories, isLoading } = api.categorys.get.useQuery();
	const { query } = useRouter();
	return (
		<Box>
			<Menu>
				<MenuButton
					as={Button}
					variant="ghost"
					rightIcon={<IoIosArrowDown />}
					size={['xs', 'sm', 'md']}
				>
					Категории
				</MenuButton>
				<MenuList zIndex={20} mt={[3, null]}>
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
					{categories?.map(({ id, path, title }) => (
						<MenuItem
							bgColor={path === query.path ? 'gray.200' : ''}
							key={id}
							as={Link}
							href={`/categories/${path}`}
							_hover={{ textDecoration: 'none' }}
							fontSize={[14, 16]}
							w={'100%'}
						>
							{title}
						</MenuItem>
					))}
				</MenuList>
			</Menu>
		</Box>
	);
};

export default Category;
