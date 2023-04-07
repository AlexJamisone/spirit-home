import { api } from '~/utils/api';
import {
	Input,
	FormControl,
	FormLabel,
	FormHelperText,
	Button,
	useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

const AdminCategorys = () => {
	const [form, setForm] = useState({
		title: '',
		path: '',
	});
	const { mutate, isLoading } = api.categorys.createCategory.useMutation();
	const toast = useToast();
	const ctx = api.useContext();
	const handlForm = (form: { title: string; path: string }) => {
		mutate(
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
					setForm({ title: '', path: '' });
					console.log('done');
				},
			}
		);
	};
	return (
		<FormControl
			w={['300px']}
			as="form"
			onSubmit={(e) => {
				e.preventDefault();
				handlForm(form);
			}}
		>
			<FormLabel>Категория</FormLabel>
			<Input
				type="text"
				placeholder="Украшения"
				onChange={(e) => setForm({ ...form, title: e.target.value })}
			/>
			<FormLabel>Путь</FormLabel>
			<Input
				onChange={(e) => setForm({ ...form, path: e.target.value })}
				type="text"
				placeholder="cloth"
			/>
			<FormHelperText>Обязательно на английском языке</FormHelperText>
			<Button isLoading={isLoading} type="submit">
				Создать
			</Button>
		</FormControl>
	);
};

export default AdminCategorys;
