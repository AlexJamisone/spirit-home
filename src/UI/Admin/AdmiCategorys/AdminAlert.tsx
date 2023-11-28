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
import { useCategory } from '~/stores/useCategory';
import { api } from '~/utils/api';
type AdminAlertProps = {
	onClose: () => void;
	isOpen: boolean;
	header?: string;
	body?: string;
	sub?: boolean;
};

const AdminAlert = ({
	isOpen,
	onClose,
	header,
	body,
	sub,
}: AdminAlertProps) => {
	const {
		category: {
			edit: { categoryId },
		},
		subCategory: {
			edit: { subCategoryId },
		},
		setClear,
	} = useCategory();
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
				setClear();
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
										subId: subCategoryId,
									},
									{
										onSuccess: () => {
											void ctx.categorys.invalidate();
											toast({
												description: `Подкатегория успешно удалена!`,
												status: 'info',
												isClosable: true,
											});
											setClear();
											onClose();
										},
									}
								);
							} else {
								deleteCategory(
									{ id: categoryId },
									{
										onSuccess: () => {
											void ctx.categorys.invalidate();
											toast({
												description: `Категория успешно удалена!`,
												status: 'info',
												isClosable: true,
											});
											setClear();
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
								setClear();
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

export default AdminAlert;
