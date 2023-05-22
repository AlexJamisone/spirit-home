import { Placemark } from '@pbe/react-yandex-maps';
import { useAddressContext } from '~/context/addressContext';
import type { Points } from '~/server/api/routers/cdek';

type PlacemarkPointProps = {
	point: Points;
};

const PlacemarkPoint = ({ point }: PlacemarkPointProps) => {
	const { select, setSelect, setShowPVZ } = useAddressContext();
	return (
		<Placemark
			geometry={[point.location.latitude, point.location.longitude]}
			onClick={() => {
				setSelect(point);
				setShowPVZ(true);
			}}
			preset=""
			fillColor="ff0000"
			options={{
				preset:
					select?.name === point.name
						? 'islands#darkGreenDotIcon'
						: 'islands#blueDotIcon',
			}}
		/>
	);
};

export default PlacemarkPoint;
