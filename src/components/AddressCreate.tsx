import {
	Button,
	FormControl,
	FormErrorMessage,
	Input,
	Stack,
	Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import {
	AddressSuggestions,
	type DaDataAddress,
	type DaDataAddressSuggestion,
	type DaDataSuggestion,
} from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

import { IMaskInput } from 'react-imask';
import { inputFildsAddress } from '~/constants/inputFildsAddress';
import AddressContext from '~/context/addressContext';
import { useNewOrderContext } from '~/context/orderContext';
import { Points } from '~/server/api/routers/cdek';
import { api } from '~/utils/api';
import UserCreater from './User/UserCreater';
import YandexMap from './YandexMaps/YandexMap';

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
	const {
		mutate: getPoints,
		data: points,
		isLoading,
	} = api.cdek.getPoints.useMutation();
	const [value, setValue] = useState<DaDataAddressSuggestion | undefined>();
	const [showMap, setShowMap] = useState(false);
	const [select, setSelect] = useState<Points | undefined>();
	const [showPVZ, setShowPVZ] = useState(false);
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
	console.log(value?.unrestricted_value);
	const handlChange = (
		suggestion: DaDataSuggestion<DaDataAddress> | undefined
	) => {
		setValue(suggestion);
		if (suggestion) {
			getPoints(
				{ city: suggestion.data.postal_code as string },
				{
					onSuccess: () => {
						setShowMap(true);
					},
				}
			);
		}
	};

	return (
		<>
			<AddressContext.Provider
				value={{
					points,
					value,
					select,
					setSelect,
					setShowPVZ,
					showPVZ,
				}}
			>
				<Stack justifyContent="center" alignItems="center" gap={3}>
					{inputFildsAddress(input, error).map(
						({ name, placeholder, value, errorMessage }, index) => (
							<FormControl
								key={name}
								isInvalid={!errorMessage ? false : isError}
								w="300px"
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
					<Stack w="300px">
						<AddressSuggestions
							token={process.env.NEXT_PUBLIC_API_DADATA as string}
							value={value}
							onChange={(suggestion) => handlChange(suggestion)}
							inputProps={{
								placeholder: 'Введите ваш город',
							}}
						/>
					</Stack>
					{showPVZ ? (
						<Stack
							border="1px solid"
							borderColor="gray.300"
							p={3}
							rounded="3xl"
							boxShadow="2xl"
							position="relative"
							initial={{ opacity: 0, y: -50 }}
							animate={{
								opacity: 1,
								y: 0,
								transition: { type: 'spring', duration: 0.3 },
							}}
							as={motion.div}
							layout
							minW="300px"
						>
							<Text>ПВЗ: {select?.name}</Text>
							<Text>Адресс: {select?.location.address}</Text>
							<Text>Режим работы: {select?.work_time}</Text>
							<Text>Телефон: {select?.phone}</Text>
							<Text>
								{select?.email
									? `Email: ${select.email}`
									: null}
							</Text>
							<Button
								size="sm"
								position="absolute"
								bottom={3}
								right={5}
								zIndex={10}
							>
								Выбрать
							</Button>
						</Stack>
					) : null}
					{showMap ? <YandexMap /> : null}
				</Stack>
			</AddressContext.Provider>

			{isSignedIn ? null : <UserCreater />}
		</>
	);
};

export default AddressCreate;
