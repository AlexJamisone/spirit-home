import {
	FormControl,
	FormErrorMessage,
	FormHelperText,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	Spinner,
	Stack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { RiErrorWarningLine } from 'react-icons/ri';
import { useCreateAddressContext } from '~/context/addressContext';

const AddressCitySelect = () => {
	const {
		input,
		isError,
		error,
		valueSuggestion,
		handlPoints,
		isLoadingCdek,
		suggestionsRef,
	} = useCreateAddressContext();
	return (
		<InputGroup w="300px" zIndex={10}>
			<FormControl
				isInvalid={
					isError &&
					error?.find((error) => error === 'Выбери город доставки')
						?.length === 0
				}
			>
				<AddressSuggestions
					token={process.env.NEXT_PUBLIC_API_DADATA as string}
					onChange={(suggestion) => {
						handlPoints?.(suggestion);
					}}
					value={valueSuggestion}
					inputProps={{
						placeholder: 'Введите ваш город',
						disabled: input.selectedPVZ,
					}}
					filterFromBound="city"
					filterToBound="city"
					renderOption={(suggestion) => suggestion.data.city}
					autoload={true}
					customInput={Input}
					ref={suggestionsRef}
					selectOnBlur={true}
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
					{error?.find((error) => error === 'Выбери город доставки')}
				</FormErrorMessage>
				{input.edit && !input.selectedPVZ ? (
					<Stack
						direction="row"
						alignItems="center"
						mt={3}
						color="blackAlpha.600"
					>
						<Icon as={RiErrorWarningLine} boxSize={5} />
						<FormHelperText textColor="blackAlpha.600">
							Для изменения пункта выдачи введите город
						</FormHelperText>
					</Stack>
				) : null}
			</FormControl>
		</InputGroup>
	);
};

export default AddressCitySelect;
