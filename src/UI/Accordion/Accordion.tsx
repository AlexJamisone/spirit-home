import { Stack, useDisclosure } from '@chakra-ui/react';
import { useReducer, type ReactNode } from 'react';
import AccordionContex from '~/context/accardionsContext';
import { AccordionReducer, initialState } from '~/reducer/AccordionReducer';
import { api } from '~/utils/api';
import AccordionAction from './AccordionAction';
import AccordionItems from './AccordionItems';

type AccordionProps = {
	accordion?: ReactNode;
	action?: ReactNode;
};

const Accordion = ({ accordion, action }: AccordionProps) => {
	const { data: role } = api.users.getUserRole.useQuery();
	const [state, dispatch] = useReducer(AccordionReducer, initialState);
	const { isOpen, onClose, onToggle } = useDisclosure();
	return (
		<AccordionContex.Provider
			value={{
				state,
				dispatch,
				isOpen,
				onClose,
				onToggle,
			}}
		>
			<Stack
				as="main"
				alignItems="center"
				pt={150}
				flexDirection="column"
				gap={5}
			>
				<Stack w={['100%', 600]}>{accordion}</Stack>
				<Stack maxW={100} minW={100}>
					{role === 'ADMIN' && action}
				</Stack>
			</Stack>
		</AccordionContex.Provider>
	);
};

Accordion.Items = AccordionItems;
Accordion.Action = AccordionAction;
export default Accordion;
