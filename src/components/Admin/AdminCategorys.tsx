import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Stack,
	Tag,
	TagLabel,
	TagLeftIcon,
	useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { api } from '~/utils/api';

const AdminCategorys = () => {
	const [form, setForm] = useState({
		id: '',
		title: '',
		path: '',
	});
	const [edit, setEdit] = useState(false);
	const { data: categorys } = api.categorys.get.useQuery();
	const { mutate: create, isLoading: loadingCreate } =
		api.categorys.create.useMutation();
	const { mutate: deleteCategory } = api.categorys.delete.useMutation();
	const { mutate: update, isLoading: loadingUpdate } =
		api.categorys.update.useMutation();
	const toast = useToast();
	const ctx = api.useContext();
	const handlForm = (form: { title: string; path: string }) => {
		create(
			{ title: form.title, path: form.path },
			{
				onSuccess: () => {
					toast({
						description: 'Категория успешно созданна!🙌',
						isClosable: true,
						status: 'success',
					});
					void ctx.categorys.invalidate();
				},
				onSettled: () => {
					setForm({ title: '', path: '', id: '' });
				},
			}
		);
	};
	const deletHandler = (id: string, title: string) => {
		deleteCategory(
			{ id },
			{
				onSuccess: () => {
					toast({
						description: `Категория ${title} успешно удалена!✌`,
						status: 'success',
						isClosable: true,
					});
					void ctx.categorys.invalidate();
				},
				onError: () => {
					toast({
						description: `Ошибка`,
						status: 'error',
						isClosable: true,
					});
				},
			}
		);
	};
	const handleEdit = (id: string, title: string, path: string) => {
		setEdit(true);
		setForm({ title, path, id });
	};
	const handleUpdate = () => {
		update(
			{ id: form.id, title: form.title, path: form.path },
			{
				onSuccess: () => {
					toast({
						description: `Обновление прошло успешно!🌊`,
						status: 'info',
						isClosable: true,
					});
					setForm({ id: '', path: '', title: '' });
					setEdit(false);
					void ctx.categorys.invalidate();
				},
			}
		);
	};
	if (!categorys) return null;
	return (
		<Stack direction="column" w={['300px']} gap={5}>
			<FormControl
				as="form"
				onSubmit={(e) => {
					e.preventDefault();
					handlForm(form);
				}}
			>
				<FormLabel>Категория</FormLabel>
				<Input
					type="text"
					isDisabled={loadingCreate || loadingUpdate}
					placeholder="Одежда"
					value={form.title}
					onChange={(e) =>
						setForm({ ...form, title: e.target.value })
					}
				/>
				<FormLabel>Путь</FormLabel>
				<Input
					isDisabled={loadingCreate || loadingUpdate}
					onChange={(e) => setForm({ ...form, path: e.target.value })}
					value={form.path}
					type="text"
					placeholder="cloth"
				/>
				<FormHelperText>Обязательно на английском языке</FormHelperText>
				{edit ? null : (
					<Button
						w={'100%'}
						mt={3}
						isLoading={loadingCreate}
						type="submit"
					>
						Создать
					</Button>
				)}
			</FormControl>
			{edit ? (
				<Button
					onClick={() => handleUpdate()}
					isLoading={loadingUpdate}
				>
					Сохранить
				</Button>
			) : null}
			<Box display="flex" gap={5} flexWrap="wrap">
				{categorys.map(({ id, title, path }) => (
					<Tag
						key={id}
						display="flex"
						alignItems="center"
						px={3}
						gap={2}
						variant="subtle"
					>
						<TagLabel
							cursor="pointer"
							onClick={() => handleEdit(id, title, path)}
						>
							{title}
						</TagLabel>
						<TagLeftIcon
							boxSize={5}
							as={GrFormClose}
							cursor="pointer"
							onClick={() => deletHandler(id, title)}
						/>
					</Tag>
				))}
			</Box>
		</Stack>
	);
};

export default AdminCategorys;
