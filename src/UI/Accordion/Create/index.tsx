import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { useAccordion } from '~/stores/useAccordion';
import { Action } from './Action';
import Inputs from './Inputs';

type AccordionCreateProps = {
	isOpen: boolean;
	onClose: () => void;
};

const AccordionCreate = ({ isOpen, onClose }: AccordionCreateProps) => {
	const {
		isEdit: { edit },
	} = useAccordion();
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader textAlign="center">
					{edit ? 'Обновить аккардион' : 'Новый аккордион'}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Inputs />
				</ModalBody>
				<ModalFooter gap={3}>
					<Action onClose={onClose} />
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AccordionCreate;
