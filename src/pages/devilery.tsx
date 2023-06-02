import Accordion from '~/components/Accordion/Accordion';

const DevileryPage = () => {
	return (
		<Accordion
			accordion={<Accordion.Items />}
			action={<Accordion.Action />}
		/>
	);
};

export default DevileryPage;
