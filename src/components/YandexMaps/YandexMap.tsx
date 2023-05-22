import Maps from './Maps';
import YandexProvider from './YandexProvider';

const YandexMap = () => {
	return (
		<YandexProvider>
			<Maps />
		</YandexProvider>
	);
};

export default YandexMap;
