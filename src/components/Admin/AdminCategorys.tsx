import {
	Box,
	Button,
	ButtonGroup,
	FormControl,
	FormHelperText,
	FormLabel,
	Icon,
	IconButton,
	Input,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useReducer } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { IoAddSharp } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import {
	AdminCategorysReducer,
	initialState,
} from '~/reducer/AdminCategoryReducer';
import { api } from '~/utils/api';

const AdminCategorys = () => {
	const [cat, dispatch] = useReducer(AdminCategorysReducer, initialState);
	const { data: categorys } = api.categorys.get.useQuery();
	const { mutate: create, isLoading: loadingCreate } =
		api.categorys.create.useMutation();
	const { mutate: update, isLoading: loadingUpdate } =
		api.categorys.update.useMutation();
	const toast = useToast();
	const ctx = api.useContext();
	const handlForm = () => {
		create(
			{ title: cat.title, path: cat.path },
			{
				onSuccess: () => {
					dispatch({ type: 'SET_CLEAR' });
					toast({
						description: 'Категория успешно созданна!🙌',
						isClosable: true,
						status: 'success',
					});
					void ctx.categorys.invalidate();
				},
			}
		);
	};

	const handleEdit = (id: string, title: string, path: string) => {
		dispatch({
			type: 'SET_CONTROLS',
			payload: {
				edit: true,
				select: false,
			},
		});
		dispatch({
			type: 'SET_ID',
			payload: id,
		});
		dispatch({ type: 'SET_TITLE', payload: title });
		dispatch({ type: 'SET_PATH', payload: path });
	};
	const handleUpdate = () => {
		update(
			{ id: cat.id, title: cat.title, path: cat.path },
			{
				onSuccess: () => {
					toast({
						description: `Обновление прошло успешно!🌊`,
						status: 'info',
						isClosable: true,
					});
					dispatch({ type: 'SET_CLEAR' });
					dispatch({
						type: 'SET_CONTROLS',
						payload: {
							edit: false,
							select: false,
						},
					});
					void ctx.categorys.invalidate();
				},
			}
		);
	};
	if (!categorys) return null;
	return (
		<Stack
			direction="column"
			alignItems="center"
			w={['300px', '100%']}
			gap={5}
		>
			<FormControl
				as="form"
				onSubmit={(e) => {
					e.preventDefault();
					if (cat.controls.edit) {
						handleUpdate();
					} else {
						handlForm();
					}
				}}
				w={'300px'}
			>
				<FormLabel>Категория</FormLabel>
				<Input
					type="text"
					isDisabled={loadingCreate || loadingUpdate}
					placeholder="Одежда"
					value={cat.title}
					onChange={(e) =>
						dispatch({ type: 'SET_TITLE', payload: e.target.value })
					}
				/>
				<FormLabel>Путь</FormLabel>
				<Input
					isDisabled={loadingCreate || loadingUpdate}
					onChange={(e) =>
						dispatch({ type: 'SET_PATH', payload: e.target.value })
					}
					value={cat.path}
					type="text"
					placeholder="cloth"
				/>
				<FormHelperText>Обязательно на английском языке</FormHelperText>
				<ButtonGroup isAttached w={'100%'} mt={3}>
					<Button
						w="100%"
						isLoading={loadingCreate}
						type="submit"
						colorScheme={cat.controls.edit ? 'telegram' : 'gray'}
					>
						{cat.controls.edit ? 'Обновить' : 'Создать'}
					</Button>
					{cat.controls.edit ? (
						<IconButton
							colorScheme="red"
							aria-label="cancel"
							icon={<Icon as={RxCross2} />}
							onClick={() => {
								dispatch({ type: 'SET_CLEAR' });
							}}
						/>
					) : null}
				</ButtonGroup>
			</FormControl>
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
								{subCategory.map(({ id, title }) => (
									<Text
										textAlign="center"
										key={id}
										cursor="pointer"
									>
										{title}
									</Text>
								))}
							</Stack>
						</Stack>
					))
				)}
			</Box>
			{cat.controls.select ? (
				<FormControl
					w="300px"
					as={motion.form}
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0 }}
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<FormLabel>Подкатегория</FormLabel>
					<Input
						onChange={(e) =>
							dispatch({
								type: 'SET_SUB_TITLE',
								payload: e.target.value,
							})
						}
						value={cat.subTitle}
						type="text"
					/>
					<FormLabel>Путь Подкатегории</FormLabel>
					<Input
						type="text"
						value={cat.subPath}
						onChange={(e) =>
							dispatch({
								type: 'SET_SUB_PATH',
								payload: e.target.value,
							})
						}
					/>
					<Stack direction="row" mt={5} justifyContent="flex-end">
						<Button colorScheme="telegram" type="submit">
							Создать
						</Button>
						<Button
							colorScheme="red"
							onClick={() =>
								dispatch({
									type: 'SET_CONTROLS',
									payload: {
										edit: false,
										select: !cat.controls.select,
									},
								})
							}
						>
							Отмена
						</Button>
					</Stack>
				</FormControl>
			) : null}
		</Stack>
	);
};

export default AdminCategorys;
