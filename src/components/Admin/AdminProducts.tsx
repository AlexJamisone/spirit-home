import { Button, Icon, useDisclosure } from '@chakra-ui/react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import AdminProductsModal from './AdminProductsModal';

const AdminProducts = () => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	return (
		<>
			<Button
				h="150px"
				variant="outline"
				rightIcon={<Icon as={IoIosAddCircleOutline} boxSize={8} />}
				onClick={() => onToggle()}
			>
				Добавить новый товар
			</Button>
			<AdminProductsModal isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default AdminProducts;
