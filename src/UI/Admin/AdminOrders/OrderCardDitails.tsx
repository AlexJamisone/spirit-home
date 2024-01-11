import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { OrderItem, Product } from '@prisma/client';
import OrderItemTable from './OrderItemTable';
type OrderCardDitailsProps = {
	isOpen: boolean;
	onClose: () => void;
	orderNumber: number;
	orderItem: (OrderItem & {
		product: Product;
	})[];
};
const OrderCardDitails = ({
	isOpen,
	onClose,
	orderNumber,
	orderItem,
}: OrderCardDitailsProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader textAlign={'center'}>
					Заказ №{orderNumber}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<OrderItemTable orderItem={orderItem} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
export default OrderCardDitails;
