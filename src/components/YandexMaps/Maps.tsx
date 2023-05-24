import { useMediaQuery } from '@chakra-ui/react';
import { Map } from '@pbe/react-yandex-maps';
import { useNewOrderContext } from '~/context/orderContext';
import PlacemarkPoint from './PlacemarkPoint';

const Maps = () => {
	const { input, valueSuggestion, points } = useNewOrderContext();
	const [isLowerThen1200] = useMediaQuery(['(max-width: 1200px)']);
	console.log(isLowerThen1200);
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
			height={isLowerThen1200 ? '250px' : '400px'}
			width={isLowerThen1200 ? '300px' : '600px'}
		>
			{points?.map((point, index) => (
				<PlacemarkPoint key={index} point={point} />
			))}
		</Map>
	);
};

export default Maps;
