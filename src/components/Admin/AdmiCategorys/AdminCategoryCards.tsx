import { Box, Icon, IconButton, Stack, Text } from '@chakra-ui/react';
import { FiEdit2 } from 'react-icons/fi';
import { IoAddSharp } from 'react-icons/io5';
import { useCreateCategoryContext } from '~/context/categoryCreateContext';

const AdminCategoryCards = () => {
	const { categorys, dispatch, cat, handleEdit } = useCreateCategoryContext();
	if (!categorys) return null;
	return (
		<Box display="flex" gap={5} flexWrap="wrap" justifyContent="center">
			{categorys.length === 0 ? (
				<Text>Пока что категорий нет</Text>
			) : (
				categorys.map(({ id, title, path, subCategory }) => (
					<Stack
						key={id}
						bgColor="gray.200"
						p={2}
						rounded="2xl"
						h="fit-content"
						border={
							cat.controls.select && cat.id === id
								? '2px solid'
								: undefined
						}
						borderColor={
							cat.controls.select && cat.id === id
								? 'green.300'
								: undefined
						}
					>
						<Stack direction="row" alignItems="center">
							<IconButton
								size="xs"
								aria-label={title}
								icon={<Icon as={IoAddSharp} />}
								colorScheme="teal"
								onClick={() => {
									dispatch({
										type: 'SET_CONTROLS',
										payload: {
											edit: false,
											select: true,
										},
									});
									dispatch({
										type: 'SET_ID',
										payload: id,
									});
								}}
							/>
							<Text fontWeight={600}>{title}</Text>
							<IconButton
								size="xs"
								aria-label={title}
								icon={<Icon as={FiEdit2} />}
								onClick={() => handleEdit(id, title, path)}
								colorScheme="twitter"
							/>
						</Stack>
						<Stack direction="column">
							{subCategory.map(
								({
									id: subId,
									title: subTitle,
									path: subPath,
								}) => (
									<Text
										textAlign="center"
										key={subId}
										cursor="pointer"
										onClick={() => {
											dispatch({
												type: 'SET_ALL',
												payload: {
													...cat,
													controls: {
														edit: true,
														select: true,
													},
													subId: subId,
													subTitle: subTitle,
													subPath: subPath,
												},
											});
										}}
									>
										{subTitle}
									</Text>
								)
							)}
						</Stack>
					</Stack>
				))
			)}
		</Box>
	);
};

export default AdminCategoryCards;
