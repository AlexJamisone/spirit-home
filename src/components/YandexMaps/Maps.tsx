import { Map } from '@pbe/react-yandex-maps';
import { useNewOrderContext } from '~/context/orderContext';
import PlacemarkPoint from './PlacemarkPoint';

const Maps = () => {
	const { input, valueSuggestion, points } = useNewOrderContext();
	return (
		<Map
			state={{
				center: [
					input.point?.location
						? Number(input.point?.location.latitude)
						: Number(valueSuggestion?.data.geo_lat),
					input.point?.location
						? Number(input.point?.location.longitude)
						: Number(valueSuggestion?.data.geo_lon),
				],
				zoom: 11,
			}}
			height="400px"
			width="600px"
		>
			{points?.map((point, index) => (
				<PlacemarkPoint key={index} point={point} />
			))}
		</Map>
	);
};

export default Maps;
