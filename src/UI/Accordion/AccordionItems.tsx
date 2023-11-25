import { Accordion, Skeleton, Spinner } from '@chakra-ui/react';

import { api } from '~/utils/api';
import AccardionStick from './AccardionStick';

type AccordionItemsProps = {
	onToggle: () => void;
};

const AccordionItems = ({ onToggle }: AccordionItemsProps) => {
	const { data: accordions, isLoading } = api.accordions.get.useQuery();

	if (!accordions || accordions.length === 0)
		return <Skeleton w="100%" h={50} />;
	if (isLoading) return <Spinner size={['sm', 'lg']} />;
	return (
		<Accordion allowMultiple>
			{accordions.map((accardion) => (
				<AccardionStick
					onToggle={onToggle}
					accordion={accardion}
					key={accardion.id}
				/>
			))}
		</Accordion>
	);
};

export default AccordionItems;
