import { useMediaQuery } from '@chakra-ui/react';
import { Map } from '@pbe/react-yandex-maps';
import { useNewOrderContext } from '~/context/orderContext';
import PlacemarkPoint from './PlacemarkPoint';

const Maps = () => {
	const { valueSuggestion, points } = useNewOrderContext();
	const [isLowerThen900] = useMediaQuery(['(max-width: 900px)']);
	return (
		<Map
			state={{
				center: [
					Number(valueSuggestion?.data.geo_lat),
					Number(valueSuggestion?.data.geo_lon),
				],
				zoom: 11,
			}}
			height={isLowerThen900 ? '250px' : '400px'}
			width={isLowerThen900 ? '300px' : '600px'}
		>
			{points?.map((point, index) => (
				<PlacemarkPoint key={index} point={point} />
			))}
		</Map>
	);
};

export default Maps;
