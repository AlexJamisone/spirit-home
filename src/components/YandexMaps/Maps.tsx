import { Map } from '@pbe/react-yandex-maps';
import { useAddressContext } from '~/context/addressContext';
import PlacemarkPoint from './PlacemarkPoint';

const Maps = () => {
	const { points, value } = useAddressContext();
	return (
		<Map
			state={{
				center: [
					Number(value?.data.geo_lat),
					Number(value?.data.geo_lon),
				],
				zoom: 11,
				margin: [10, 10, 10, 10],
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
