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
		<Menu placement="right-start" autoSelect={false}>
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
								fontWeight={400}
								_hover={{
									textColor: 'brand',
								}}
								_active={{
									textColor: 'brand',
								}}
							>
								{title}
							</MenuButton>
						) : (
							<Link
								_hover={{
									textColor: 'brand',
									textDecoration: 'none',
								}}
								py={[1, 2]}
								px={[3, 4]}
								fontSize={[14, 16]}
								rounded="md"
								href={`/categories/${path}`}
								onClick={closeMain}
								fontWeight={400}
							>
								{title}
							</Link>
						)}
					</Stack>

					<MenuList
						display="flex"
						flexDirection="column"
						borderRadius="none"
						borderBottomRightRadius="25px"
					>
						{subCategory?.map(({ id, title, path: subPath }) => (
							<MenuItem
								key={id}
                                borderRadius='25px'
								_hover={{
									textDecoration: 'none',
									textColor: 'brand',
									bgColor: 'transparent',
								}}
							>
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
