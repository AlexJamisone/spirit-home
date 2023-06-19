import { Placemark } from '@pbe/react-yandex-maps';
import type { Point } from '@prisma/client';
import { useCreateAddressContext } from '~/context/addressContext';

type PlacemarkPointProps = {
	point: Point;
};

const PlacemarkPoint = ({ point }: PlacemarkPointProps) => {
	const { dispatch, input } = useCreateAddressContext();
	return (
		<Placemark
			geometry={[point.latitude, point.longitude]}
			onClick={() => {
				dispatch({ type: 'SET_POINT', payload: point });
				dispatch({ type: 'SET_PVZ', payload: true });
			}}
			fillColor="ff0000"
			options={{
				preset:
					input.point?.name === point.name
						? 'islands#darkGreenCircleIcon'
						: 'islands#blueCircleIcon',
			}}
		/>
	);
};

export default PlacemarkPoint;
