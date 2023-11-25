import { Icon, IconButton } from '@chakra-ui/react';
import { GoPlus } from 'react-icons/go';
import AccordionCreate from './Create';
type AccordionActionProps = {
	isOpen: boolean;
	onClose: () => void;
	onToggle: () => void;
};
const AccordionAction = ({
	isOpen,
	onClose,
	onToggle,
}: AccordionActionProps) => {
	return (
		<>
			<IconButton
				aria-label="add"
				onClick={onToggle}
				variant="outline"
				icon={<Icon as={GoPlus} boxSize={5} color="pink.300" />}
				w="100%"
			/>
			<AccordionCreate isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default AccordionAction;
