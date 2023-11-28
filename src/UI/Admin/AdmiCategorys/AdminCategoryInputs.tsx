import {
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	Stack,
	useToast,
} from '@chakra-ui/react';
import { categoryInputs } from '~/constants/categoryInputs';
import { useCategory, type CategoryInputValue } from '~/stores/useCategory';
import { api } from '~/utils/api';

const AdminCategoryInputs = () => {
	const {
		category: {
			input,
			edit: { isEdit, categoryId: id },
			error,
		},
		setClear,
		setCategoryError,
		resetCategory,
		setCategoryInput,
	} = useCategory();

	const { mutate: create, isLoading: loadingCreate } =
		api.categorys.create.useMutation();
	const { mutate: update, isLoading: loadingUpdate } =
		api.categorys.update.useMutation();
	const toast = useToast();
	const ctx = api.useContext();
	const handlCategory = () => {
		const { path, title } = input;
		if (isEdit && id.length !== 0) {
			update(
				{ id, title, path },
				{
					onSuccess: () => {
						void ctx.categorys.invalidate();
						toast({
							description: `Обновление прошло успешно!🌊`,
							status: 'info',
							isClosable: true,
						});
						setClear();
					},
				}
			);
		} else {
			create(
				{ title: title ?? '', path },
				{
					onSuccess: () => {
						void ctx.categorys.invalidate();
						toast({
							description: 'Категория успешно созданна!🙌',
							isClosable: true,
							status: 'success',
						});
						setClear();
					},
					onError: ({ data, message }) => {
						const error = data?.zodError?.fieldErrors;
						if (error) {
							setCategoryError({ isError: true, msg: error });
						} else {
							toast({
								description: message,
								status: 'error',
								isClosable: true,
							});
						}
					},
				}
			);
		}
	};
	return (
		<Stack>
			{categoryInputs('category').map(
				({ id, label, name, placeholder, type, helper }) => (
					<FormControl
						key={id}
						isInvalid={
							error?.isError && error.msg[name] !== undefined
						}
					>
						<FormLabel>{label}</FormLabel>
						<Input
							placeholder={placeholder}
							type={type}
							name={name}
							value={input[name]}
							onChange={(e) => {
								if (error?.isError) {
									resetCategory();
								}
								setCategoryInput({
									[name]: e.target.value,
								} as CategoryInputValue);
							}}
						/>
						<FormHelperText
							fontWeight={600}
							textColor="blackAlpha.400"
						>
							{helper}
						</FormHelperText>
						<FormErrorMessage fontWeight={600}>
							{error?.msg[name]?.[0]}
						</FormErrorMessage>
					</FormControl>
				)
			)}
			<Button
				onClick={handlCategory}
				isLoading={loadingCreate || loadingUpdate}
				colorScheme={isEdit ? 'telegram' : undefined}
			>
				{isEdit ? 'Обновить' : 'Создать'}
			</Button>
			{isEdit && (
				<Button colorScheme="red" onClick={setClear}>
					Отмена
				</Button>
			)}
		</Stack>
	);
};

export default AdminCategoryInputs;
