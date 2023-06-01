import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Stack,
	useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useCreateCategoryContext } from '~/context/categoryCreateContext';
import { api } from '~/utils/api';

const AdminSubCategory = () => {
	const { cat, dispatch } = useCreateCategoryContext();
	const { mutate: updateSubCategory, isLoading: loadingUpdateSub } =
		api.categorys.updateSubCategory.useMutation();
	const { mutate: createSubCategory, isLoading: loadingCreateSub } =
		api.categorys.createSubCategory.useMutation();
	const toast = useToast();
	const ctx = api.useContext();
	return (
		<>
			{cat.controls.select ? (
				<FormControl
					w="300px"
					as={motion.form}
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0 }}
					onSubmit={(e) => {
						e.preventDefault();
						if (cat.controls.edit) {
							updateSubCategory(
								{
									id: cat.subId,
									subTitle: cat.subTitle,
									subPath: cat.subPath,
								},
								{
									onSuccess: () => {
										void ctx.categorys.invalidate();
										toast({
											description: `Подкатегория ${cat.subTitle} обновленна!`,
											isClosable: true,
											status: 'success',
										});
										dispatch({
											type: 'SET_CLEAR',
										});
									},
								}
							);
						} else {
							createSubCategory(
								{
									id: cat.id,
									subPath: cat.subPath,
									subTitle: cat.subTitle,
								},
								{
									onSuccess: () => {
										void ctx.categorys.invalidate();
										toast({
											description: `${cat.subTitle} успешно создана`,
											isClosable: true,
											status: 'success',
										});
										dispatch({ type: 'SET_CLEAR' });
									},
								}
							);
						}
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
						<Button
							colorScheme="telegram"
							type="submit"
							isLoading={loadingCreateSub || loadingUpdateSub}
						>
							{cat.controls.edit && cat.controls.select
								? 'Обновить'
								: 'Создать'}
						</Button>
						<Button
							colorScheme="red"
							onClick={() =>
								dispatch({
									type: 'SET_CLEAR',
								})
							}
						>
							Отмена
						</Button>
					</Stack>
				</FormControl>
			) : null}
		</>
	);
};

export default AdminSubCategory;
