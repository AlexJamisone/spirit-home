import { Placemark } from '@pbe/react-yandex-maps';
import { useNewOrderContext } from '~/context/orderContext';
import type { Points } from '~/server/api/routers/cdek';

type PlacemarkPointProps = {
	point: Points;
};

const PlacemarkPoint = ({ point }: PlacemarkPointProps) => {
	const { dispatch, input } = useNewOrderContext();
	return (
		<Placemark
			geometry={[point.location.latitude, point.location.longitude]}
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
