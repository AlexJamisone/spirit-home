import {
	Button,
	ButtonGroup,
	FormControl,
	FormHelperText,
	FormLabel,
	Icon,
	IconButton,
	Input,
	useToast,
} from '@chakra-ui/react';
import { RxCross2 } from 'react-icons/rx';
import { useCreateCategoryContext } from '~/context/categoryCreateContext';
import { api } from '~/utils/api';

const AdminMainCategory = () => {
	const { cat, dispatch } = useCreateCategoryContext();
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
	return (
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
					dispatch({
						type: 'SET_TITLE',
						payload: e.target.value,
					})
				}
			/>
			<FormLabel>Путь</FormLabel>
			<Input
				isDisabled={loadingCreate || loadingUpdate}
				onChange={(e) =>
					dispatch({
						type: 'SET_PATH',
						payload: e.target.value,
					})
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
					colorScheme={
						cat.controls.edit && !cat.controls.select
							? 'telegram'
							: 'gray'
					}
				>
					{cat.controls.edit && !cat.controls.select
						? 'Обновить'
						: 'Создать'}
				</Button>
				{cat.controls.edit && !cat.controls.select ? (
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
	);
};

export default AdminMainCategory;
