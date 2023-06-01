import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	useToast,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useCreateCategoryContext } from '~/context/categoryCreateContext';
import { api } from '~/utils/api';
type AdminCategoryAlertProps = {
	onClose: () => void;
	isOpen: boolean;
	header?: string;
	body?: string;
	sub?: boolean;
};

const AdminCategoryAlert = ({
	isOpen,
	onClose,
	header,
	body,
	sub,
}: AdminCategoryAlertProps) => {
	const { dispatch, cat } = useCreateCategoryContext();
	const { mutate: deleteCategory, isLoading: loadingDelMain } =
		api.categorys.delete.useMutation();
	const { mutate: deletSubCategory, isLoading: loadingDelSub } =
		api.categorys.deletSubCat.useMutation();
	const ctx = api.useContext();
	const cancelRef = useRef<HTMLButtonElement>(null);
	const toast = useToast();
	return (
		<AlertDialog
			leastDestructiveRef={cancelRef}
			isOpen={isOpen}
			onClose={() => {
				onClose();
				dispatch({ type: 'SET_CLEAR' });
			}}
			isCentered
			motionPreset="slideInBottom"
		>
			<AlertDialogOverlay />
			<AlertDialogContent>
				<AlertDialogHeader>{header}</AlertDialogHeader>
				<AlertDialogBody>{body}</AlertDialogBody>
				<AlertDialogFooter gap={3}>
					<Button
						colorScheme="red"
						isLoading={loadingDelMain || loadingDelSub}
						onClick={() => {
							if (sub) {
								deletSubCategory(
									{
										subId: cat.subId,
									},
									{
										onSuccess: () => {
											void ctx.categorys.invalidate();
											toast({
												description: `Подкатегория ${cat.subTitle} успешно удалена!`,
												status: 'info',
												isClosable: true,
											});
											dispatch({ type: 'SET_CLEAR' });
											onClose();
										},
									}
								);
							} else {
								deleteCategory(
									{ id: cat.id },
									{
										onSuccess: () => {
											void ctx.categorys.invalidate();
											toast({
												description: `Категория ${cat.title} успешно удалена!`,
												status: 'info',
												isClosable: true,
											});
											dispatch({ type: 'SET_CLEAR' });
											onClose();
										},
									}
								);
							}
						}}
					>
						Потвердить
					</Button>
					<Button
						ref={cancelRef}
						onClick={() => {
							if (sub) {
								onClose();
							} else {
								dispatch({ type: 'SET_CLEAR' });
								onClose();
							}
						}}
					>
						Отмена
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default AdminCategoryAlert;
