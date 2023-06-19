import { Icon, IconButton } from '@chakra-ui/react';
import { GoPlus } from 'react-icons/go';
import { useAccordionContext } from '~/context/accardionsContext';
import AccordionCreate from './AccordionCreate';
const AccordionAction = () => {
	const { onToggle } = useAccordionContext();
	return (
		<>
			<IconButton
				aria-label="add"
				onClick={onToggle}
				variant="outline"
				icon={<Icon as={GoPlus} boxSize={5} color="pink.300" />}
				w="500px"
			/>
			<AccordionCreate />
		</>
	);
};

export default AccordionAction;
