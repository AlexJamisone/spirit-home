import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogOverlay,
	Button,
} from '@chakra-ui/react';
import { useRef, type Dispatch } from 'react';
import type { Action } from '~/reducer/FormReducer';
import { api } from '~/utils/api';
import type { UploadResult } from '~/utils/uploadImage';

type AdminProductsAlertProps = {
	isOpen: boolean;
	onCloseAlert: () => void;
	path: UploadResult[];
	onCloseModal: () => void;
	dispatch: Dispatch<Action>;
};

const AdminProductsAlert = ({
	isOpen,
	onCloseAlert,
	path,
	onCloseModal,
	dispatch,
}: AdminProductsAlertProps) => {
	const cancelRef = useRef<HTMLButtonElement>(null);
	const { mutate: deletImage, isLoading } =
		api.products.deletImage.useMutation();
	const handlDeletImage = (res: UploadResult[]) => {
		deletImage(res, {
			onSuccess: () => {
				dispatch({ type: 'SET_CLEAR' });
				onCloseAlert();
				onCloseModal();
			},
		});
	};
	return (
		<AlertDialog
			motionPreset="slideInBottom"
			isCentered
			isOpen={isOpen}
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
