import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { useCreateProduct } from '~/stores/useCreateProduct';
import AdminCreateImages from './AdminCreateImages';
import AdminCreateInputs from './AdminCreateInputs';
import CategoriesSelector from './CategoriesSelector';
import DragDrop from './Drag&Drop';
import ProducCreateAction from './ProducCreateAction';
import Size from './Size';

type AdminProductsModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const AdminCreateProduct = ({ isOpen, onClose }: AdminProductsModalProps) => {
	const isEdit = useCreateProduct((state) => state.isEdit);
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			closeOnOverlayClick={false}
			closeOnEsc={false}
		>
			<ModalOverlay />
			<ModalContent w={['500px']} maxW={'100%'}>
				<ModalHeader>
					{isEdit ? 'Обновить' : 'Создать'} товар
				</ModalHeader>
				<ModalBody display="flex" flexDirection="column" gap={5}>
					<AdminCreateImages />
					<DragDrop />
					<AdminCreateInputs />
					<Size />
					<CategoriesSelector />
				</ModalBody>
				<ModalFooter gap={5}>
					<ProducCreateAction onClose={onClose} />
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
export default AdminCreateProduct;
