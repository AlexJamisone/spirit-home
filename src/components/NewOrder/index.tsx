import { Stack } from '@chakra-ui/react';
import YandexMap from '~/UI/YandexMaps/YandexMap';
import { useNewOrder } from '~/stores/useNewOrder';
import CdekPointCard from './CdekPointCard';
import Inputs from './Inputs';
import NewOrderAction from './NewOrderAction';

const NewOrder = () => {
	const { controls } = useNewOrder();
	return (
		<Stack alignItems="center" gap={10}>
			<Stack direction="row">
				<Inputs />
				{controls.showMap && <YandexMap />}
			</Stack>
			{controls.showPVZ && <CdekPointCard />}
			<NewOrderAction />
		</Stack>
	);
};

export default NewOrder;
