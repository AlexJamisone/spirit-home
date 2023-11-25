import { Stack, useDisclosure } from '@chakra-ui/react';
import { api } from '~/utils/api';
import AccordionAction from './AccordionAction';
import AccordionItems from './AccordionItems';

const Accordion = () => {
	const { data: role } = api.users.getUserRole.useQuery();
	const { onClose, isOpen, onToggle } = useDisclosure();
	return (
		<Stack
			as="main"
			alignItems="center"
			pt={150}
			flexDirection="column"
			gap={5}
		>
			<Stack w={['100%', 600]}>
				<AccordionItems onToggle={onToggle} />
			</Stack>
			<Stack maxW={100} minW={100}>
				{role === 'ADMIN' && (
					<AccordionAction
						isOpen={isOpen}
						onClose={onClose}
						onToggle={onToggle}
					/>
				)}
			</Stack>
		</Stack>
	);
};

export default Accordion;
