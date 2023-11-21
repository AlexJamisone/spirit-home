import { Placemark } from '@pbe/react-yandex-maps';
import type { FiltredPoint } from '~/server/api/routers/cdek';
import { useNewOrder } from '~/stores/useNewOrder';

type PlacemarkPointProps = {
	point: FiltredPoint;
};

const PlacemarkPoint = ({ point }: PlacemarkPointProps) => {
	const { address, setPoint, setControls } = useNewOrder();
	return (
		<Placemark
			geometry={[point.latitude, point.longitude]}
			onClick={() => {
				setPoint({ selectedPoint: point });
				setControls({ showPVZ: true });
			}}
			fillColor="ff0000"
			options={{
				preset:
					address.selectedPoint?.name === point.name
						? 'islands#darkGreenCircleIcon'
						: 'islands#blueCircleIcon',
			}}
		/>
	);
};

export default PlacemarkPoint;
