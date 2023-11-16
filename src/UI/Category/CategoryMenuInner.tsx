import { Link } from '@chakra-ui/next-js';
import {
	Button,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
} from '@chakra-ui/react';
import type { SubCategory } from '@prisma/client';
import { MdKeyboardArrowRight } from 'react-icons/md';

type CategoryMenuInnerProps = {
	title: string;
	subCategory?: SubCategory[];
	path: string;
	closeMain: () => void;
};

const CategoryMenuInner = ({
	title,
	subCategory,
	path,
	closeMain,
}: CategoryMenuInnerProps) => {
	return (
		<Menu placement="right-end" autoSelect={false}>
			{({ onClose }) => (
				<>
					<Stack w="container">
						{subCategory?.length ?? 0 > 0 ? (
							<MenuButton
								w="100%"
								size={['sm', 'md']}
								textAlign="left"
								as={Button}
								variant="ghost"
								position="relative"
								rightIcon={<Icon as={MdKeyboardArrowRight} />}
							>
								{title}
							</MenuButton>
						) : (
							<Link
								_hover={{
									textDecoration: 'none',
									bgColor: 'gray.100',
								}}
								fontWeight={600}
								py={[1, 2]}
								px={[3, 4]}
								fontSize={[14, 16]}
								rounded="md"
								href={`/categories/${path}`}
								onClick={closeMain}
							>
								{title}
							</Link>
						)}
					</Stack>

					<MenuList display="flex" flexDirection="column">
						{subCategory?.map(({ id, title, path: subPath }) => (
							<MenuItem key={id}>
								<Link
									_hover={{
										textDecoration: 'none',
									}}
									href={`/categories/${subPath}`}
									onClick={() => {
										onClose();
										closeMain();
									}}
									fontSize={[14, 16]}
								>
									{title}
								</Link>
							</MenuItem>
						))}
					</MenuList>
				</>
			)}
		</Menu>
	);
};

export default CategoryMenuInner;
