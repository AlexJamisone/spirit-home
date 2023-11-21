import { useMediaQuery } from '@chakra-ui/react';
import { Map } from '@pbe/react-yandex-maps';
import { useNewOrder } from '~/stores/useNewOrder';
import PlacemarkPoint from './PlacemarkPoint';

const Maps = () => {
	const { address } = useNewOrder();
	const [isLowerThen900] = useMediaQuery(['(max-width: 900px)']);
	console.log(address);
	return (
		<Map
			state={{
				center: [
					Number(address.valueSuggestion?.data.geo_lat),
					Number(address.valueSuggestion?.data.geo_lon),
				],
				zoom: 11,
			}}
			height={isLowerThen900 ? '250px' : '400px'}
			width={isLowerThen900 ? '300px' : '600px'}
		>
			{address.points?.map((point, index) => (
				<PlacemarkPoint key={index} point={point} />
			))}
		</Map>
	);
};

export default Maps;
