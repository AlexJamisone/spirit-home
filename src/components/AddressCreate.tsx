import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { motion } from 'framer-motion';
import type { ChangeEvent } from 'react';
import { IMaskInput } from 'react-imask';
import { inputFildsAddress } from '~/constants/inputFildsAddress';
import { useNewOrderContext } from '~/context/orderContext';
import { api } from '~/utils/api';
import UserCreater from './User/UserCreater';

const AddressCreate = () => {
	const {
		dispatch,
		input,
		initialRef,
		isSignedIn,
		resetNoAddress,
		resetNoAuth,
		error,
		isError,
	} = useNewOrderContext();
	const { data: cdek } = api.cdek.get.useQuery();
	const handlInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		switch (name) {
			case 'firstName':
				dispatch({ type: 'SET_NAME', payload: value });
				break;
			case 'lastName':
				dispatch({ type: 'SET_LAST_NAME', payload: value });
				break;
			case 'city':
				dispatch({ type: 'SET_CITY', payload: value });
				break;
			case 'phone':
				dispatch({ type: 'SET_PHONE', payload: value });
				break;
			case 'cdek':
				dispatch({ type: 'SET_POINT', payload: value });
				break;
			default:
				break;
		}
	};
	console.log(cdek);
	return (
		<>
			<>
				{inputFildsAddress(input, error).map(
					({ name, placeholder, value, errorMessage }, index) => (
						<FormControl
							key={name}
							w="300px"
							isInvalid={!errorMessage ? false : isError}
						>
							<Input
								inputRef={
									name === 'firstName' ? initialRef : null
								}
								as={IMaskInput}
								mask={
									name === 'phone'
										? '+{7}(000)000-00-00'
										: false
								}
								type="text"
								name={name}
								w={['300px']}
								placeholder={placeholder}
								value={value ?? ''}
								onChange={(e) => {
									void resetNoAuth() || resetNoAddress();
									handlInput(e);
								}}
							/>
							<FormErrorMessage
								as={motion.div}
								initial={{ opacity: 0, y: 50 }}
								animate={{
									opacity: 1,
									y: 0,
									transition: {
										type: 'spring',
										duration: 0.5,
										delay: 0.1 * index,
									},
								}}
								exit={{ opacity: 0 }}
								fontWeight={600}
								fontSize={12}
							>
								{errorMessage}
							</FormErrorMessage>
						</FormControl>
					)
				)}
				<YMaps
					query={{
						lang: 'ru_RU',
						apikey: '1c8b792a-9235-4dac-a91b-ca52ec78b63b',
					}}
				>
					<Map
						defaultState={{
							center: [44.58, 33.52],
							zoom: 10,
							margin: [10, 10, 10, 10],
						}}
						height="400px"
						width="600px"
					>
						{cdek?.map(({ location, name }, index) => (
							<Placemark
								key={index}
								defaultGeometry={[
									location.latitude,
									location.longitude,
								]}
								modules={['geoObject.addon.balloon']}
								properties={{
									balloonContentHeader: `${name}`,
									balloonContent: 'Content',
									balloonContentFooter: 'Footer',
								}}
								options={{
									pane: 'places',
									balloonContent: 'Some of content',
									balloonAutoPanUseMapMargin: false,
								}}
							/>
						))}
					</Map>
				</YMaps>
			</>

			{isSignedIn ? null : <UserCreater />}
		</>
	);
};

export default AddressCreate;
