import { YMaps } from '@pbe/react-yandex-maps';
import React from 'react';

const YandexProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<YMaps
			query={{
				lang: 'ru_RU',
				apikey: process.env.YANDEX_MAPS,
			}}
			version="2.1.79"
		>
			{children}
		</YMaps>
	);
};

export default YandexProvider;
