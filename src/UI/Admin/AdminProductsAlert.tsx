import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogOverlay,
	Button,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useCreateProductContext } from '~/context/createProductContext';
import { api } from '~/utils/api';
import type { UploadResult } from '~/utils/uploadImage';

const AdminProductsAlert = () => {
	const cancelRef = useRef<HTMLButtonElement>(null);
	const { dispatch, onCloseAlert, path, onClose, openAlert } =
		useCreateProductContext();
	const { mutate: deletImage, isLoading } =
		api.products.deletImage.useMutation();
	const handlDeletImage = (res: UploadResult[]) => {
		deletImage(res, {
			onSuccess: () => {
				dispatch({ type: 'SET_CLEAR' });
				onCloseAlert();
				onClose();
			},
		});
	};
	return (
		<AlertDialog
			motionPreset="slideInBottom"
			isCentered
			isOpen={openAlert}
			onClose={onCloseAlert}
			leastDestructiveRef={cancelRef}
		>
			<AlertDialogOverlay />
			<AlertDialogContent>
				<AlertDialogBody>Cбросить данные о товаре?</AlertDialogBody>
				<AlertDialogFooter gap={5}>
					<Button onClick={onCloseAlert}>Отмена</Button>
					<Button
						colorScheme="red"
						ref={cancelRef}
						isLoading={isLoading}
						onClick={() => handlDeletImage(path)}
					>
						Сбросить
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default AdminProductsAlert;
