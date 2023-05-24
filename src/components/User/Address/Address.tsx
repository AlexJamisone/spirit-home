import {
	Button,
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	InputRightElement,
	Spinner,
	Stack,
	Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { ChangeEvent } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

import { IMaskInput } from 'react-imask';
import { inputFildsAddress } from '~/constants/inputFildsAddress';
import { useNewOrderContext } from '~/context/orderContext';
import YandexMap from '../../YandexMaps/YandexMap';
import UserCreater from '../UserCreater';

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
		handlPoints,
		valueSuggestion,
		isLoadingCdek,
	} = useNewOrderContext();

	const handlInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		switch (name) {
			case 'firstName':
				dispatch({ type: 'SET_NAME', payload: value });
				break;
			case 'lastName':
				dispatch({ type: 'SET_LAST_NAME', payload: value });
				break;
			case 'phone':
				dispatch({ type: 'SET_PHONE', payload: value });
				break;
			default:
				break;
		}
	};
	return (
		<>
			<Stack justifyContent="center" alignItems="center" gap={3}>
				{inputFildsAddress(input, error).map(
					({ name, placeholder, value, errorMessage }, index) => (
						<FormControl
							key={name}
							isInvalid={!errorMessage ? false : isError}
							w="300px"
							as={motion.div}
							layout
						>
							<Input
								inputRef={
									name === 'firstName' ? initialRef : null
								}
								as={IMaskInput}
								mask={
									name === 'phone' ? '+{7}(000)000-00-00' : ''
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
				<InputGroup w="300px" zIndex={10}>
					<FormControl isInvalid={isError}>
						<AddressSuggestions
							token={process.env.NEXT_PUBLIC_API_DADATA as string}
							value={valueSuggestion}
							onChange={(suggestion) => handlPoints(suggestion)}
							inputProps={{
								placeholder: 'Введите ваш город',
								disabled: input.selectedPVZ,
							}}
							filterFromBound="city"
							filterToBound="city"
							renderOption={(suggestion) => suggestion.data.city}
							autoload={true}
							customInput={Input}
						/>
						<InputRightElement position="absolute">
							{isLoadingCdek ? <Spinner size={['sm']} /> : null}
						</InputRightElement>
						<FormErrorMessage
							as={motion.div}
							initial={{ opacity: 0, y: 50 }}
							animate={{
								opacity: 1,
								y: 0,
								transition: {
									type: 'spring',
									duration: 0.5,
									delay: 0.1,
								},
							}}
							exit={{ opacity: 0 }}
							fontWeight={600}
							fontSize={12}
						>
							{error?.find(
								(error) => error === 'Выбери город доставки'
							)}
						</FormErrorMessage>
					</FormControl>
				</InputGroup>
				{input.showPVZ ? (
					<Stack
						border="1px solid"
						borderColor={
							input.selectedPVZ ? 'green.300' : 'gray.300'
						}
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
						fontSize={[14, 16]}
					>
						<Text>ПВЗ: {input.point?.name}</Text>
						<Text>Адресс: {input.point?.addressName}</Text>
						<Text>Режим работы: {input.point?.work_time}</Text>
						<Text>Телефон: {input.point?.phone}</Text>
						<Text>
							{input.point?.email
								? `Email: ${input.point.email}`
								: null}
						</Text>
						<Button
							size="sm"
							position="absolute"
							bottom={3}
							right={5}
							zIndex={10}
							ml={1}
							border={
								input.errorSelectedPVZ ? '2px solid' : undefined
							}
							borderColor={
								input.errorSelectedPVZ
									? 'orange.200'
									: undefined
							}
							onClick={() => {
								resetNoAddress();
								resetNoAuth();
								dispatch({
									type: 'SET_MAP',
									payload: !input.showMap,
								});
								dispatch({
									type: 'SET_SELECTED_PVZ',
									payload: !input.selectedPVZ,
								});
								if (input.errorSelectedPVZ)
									dispatch({
										type: 'SET_ERROR_SELECTED_PVZ',
										payload: false,
									});
							}}
						>
							{input.showMap ? 'Выбрать' : 'Изменить'}
						</Button>
					</Stack>
				) : null}
				{input.showMap ? <YandexMap /> : null}
			</Stack>
			{isSignedIn ? null : <UserCreater />}
		</>
	);
};

export default AddressCreate;
