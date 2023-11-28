import {
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Icon,
	IconButton,
	Input,
	Stack,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { categoryInputs } from '~/constants/categoryInputs';
import { useCategory, type SubCategoryInputValue } from '~/stores/useCategory';
import { api } from '~/utils/api';
import AdminCategoryAlert from './AdminAlert';

const AdminSubCategoryInputs = () => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const { mutate: updateSubCategory, isLoading: loadingUpdateSub } =
		api.categorys.updateSubCategory.useMutation();
	const { mutate: createSubCategory, isLoading: loadingCreateSub } =
		api.categorys.createSubCategory.useMutation();
	const {
		subCategory: {
			input,
			edit: { isEdit, subCategoryId },
			error,
		},
		category: {
			edit: { categoryId },
		},
		setSubCategoryError,
		setClear,
		resetSubCategory,
		setSubCategoryInput,
	} = useCategory();
	const toast = useToast();
	const ctx = api.useContext();

	const handlSubCategory = () => {
		const { path, title } = input;
		if (isEdit) {
			updateSubCategory(
				{
					id: subCategoryId,
					path,
					title,
				},
				{
					onSuccess: () => {
						void ctx.categorys.invalidate();
						toast({
							description:
								'Подкатегория успешно обновлена! 😀 😊',
							status: 'info',
							isClosable: true,
						});
						setClear();
					},
					onError: ({ data, message }) => {
						const error = data?.zodError?.fieldErrors;
						if (error) {
							setSubCategoryError({ isError: true, msg: error });
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
		} else {
			createSubCategory(
				{
					categoryId,
					path,
					title: title ?? '',
				},
				{
					onSuccess: () => {
						void ctx.categorys.invalidate();
						toast({
							description: 'Подкатегория успешно создана! 😀',
							status: 'success',
							isClosable: true,
						});
						setClear();
					},
					onError: ({ data, message }) => {
						const error = data?.zodError?.fieldErrors;
						if (error) {
							setSubCategoryError({ isError: true, msg: error });
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
			{categoryInputs('subCategory').map(
				({ id, label, name, placeholder, type, helper }) => (
					<FormControl
						key={id}
						isInvalid={
							error?.isError && error?.msg[name] !== undefined
						}
					>
						<FormLabel>{label}</FormLabel>
						<Input
							value={input[name]}
							name={name}
							type={type}
							placeholder={placeholder}
							onChange={(e) => {
								if (error?.isError) void resetSubCategory();
								setSubCategoryInput({
									[name]: e.target.value,
								} as SubCategoryInputValue);
							}}
						/>
						<FormHelperText>{helper}</FormHelperText>
						<FormErrorMessage fontWeight={600}>
							{error?.msg[name]?.[0]}
						</FormErrorMessage>
					</FormControl>
				)
			)}
			<Button
				onClick={handlSubCategory}
				isLoading={loadingCreateSub || loadingUpdateSub}
			>
				{isEdit ? 'Обновить' : 'Создать'}
			</Button>
			<Button
				onClick={() => {
					setClear();
				}}
			>
				Отмена
			</Button>
			{isEdit && (
				<>
					<IconButton
						aria-label="delet"
						icon={<Icon as={MdDelete} />}
						colorScheme="red"
						size="xs"
						onClick={onToggle}
					/>
					<AdminCategoryAlert
						isOpen={isOpen}
						onClose={onClose}
						header="Потвердите удаление подкатегории!"
						body="Удаление подкатегории нельзя отменить, сама категория останется!"
						sub={true}
					/>
				</>
			)}
		</Stack>
	);
};

export default AdminSubCategoryInputs;
