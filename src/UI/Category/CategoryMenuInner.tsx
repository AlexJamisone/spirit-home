import {
	Button,
	Link as ChakraLink,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
} from '@chakra-ui/react';
import type { SubCategory } from '@prisma/client';
import Link from 'next/link';
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
		<Menu placement="right" autoSelect={false}>
			{({ onClose }) => (
				<>
					<Stack>
						{subCategory?.length ?? 0 > 0 ? (
							<MenuButton
								size={['sm', 'md']}
								textAlign="left"
								as={Button}
								variant="ghost"
								position="relative"
								rightIcon={
									<Icon
										as={MdKeyboardArrowRight}
										boxSize={5}
										position="absolute"
										top="25%"
										right="5%"
									/>
								}
							>
								{title}
							</MenuButton>
						) : (
							<ChakraLink
								_hover={{
									textDecoration: 'none',
									bgColor: 'gray.100',
								}}
								fontWeight={600}
								py={[1, 2]}
								px={[3, 4]}
								fontSize={[14, 16]}
								rounded="md"
								as={Link}
								href={`/categories/${path}`}
								onClick={closeMain}
							>
								{title}
							</ChakraLink>
						)}
					</Stack>

					<MenuList minW={['100px', null]}>
						{subCategory?.map(({ id, title, path: subPath }) => (
							<MenuItem
								key={id}
								as={Link}
								href={`/categories/${subPath}`}
								onClick={() => {
									onClose();
									closeMain();
								}}
								fontSize={[14, 16]}
							>
								{title}
							</MenuItem>
						))}
					</MenuList>
				</>
			)}
		</Menu>
	);
};

export default CategoryMenuInner;
