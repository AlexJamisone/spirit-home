import { Button, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNewOrderContext } from '~/context/orderContext';
import YandexMap from '../../YandexMaps/YandexMap';
import UserCreater from '../UserCreater';
import AddressCitySelect from './AddressCitySelect';
import AddressInput from './AddressInput';

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
	return (
		<>
			<Stack justifyContent="center" alignItems="center" gap={3}>
				<AddressInput
					input={input}
					dispatch={dispatch}
					error={error}
					initialRef={initialRef}
					isError={isError}
					onChangeAction={() =>
						void resetNoAuth() || void resetNoAddress()
					}
				/>
				<AddressCitySelect
					dispatch={dispatch}
					handlPoints={handlPoints}
					input={input}
					valueSuggestion={valueSuggestion}
					error={error}
					isError={isError}
					isLoadingCdek={isLoadingCdek}
				/>
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
