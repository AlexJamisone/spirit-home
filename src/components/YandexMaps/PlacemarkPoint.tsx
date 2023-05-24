import { Placemark } from '@pbe/react-yandex-maps';
import type { Point } from '@prisma/client';
import { useNewOrderContext } from '~/context/orderContext';

type PlacemarkPointProps = {
	point: Point;
};

const PlacemarkPoint = ({ point }: PlacemarkPointProps) => {
	const { dispatch, input } = useNewOrderContext();
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
