import { Center, useDisclosure } from '@chakra-ui/react';
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
			<Center
				as="main"
				justifyContent="center"
				pt={150}
				flexDirection="column"
				gap={5}
			>
				{accordion}
				{role === 'ADMIN' ? action : null}
			</Center>
		</AccordionContex.Provider>
	);
};

Accordion.Items = AccordionItems;
Accordion.Action = AccordionAction;
export default Accordion;
