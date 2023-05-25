import {
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	InputRightElement,
	Spinner,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { Dispatch } from 'react';
import {
	AddressSuggestions,
	type DaDataAddress,
	type DaDataAddressSuggestion,
	type DaDataSuggestion,
} from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import type { Action, InputAddressState } from '~/reducer/InputAddressReducer';

type AddressCitySelectProps = {
	input: InputAddressState;
	dispatch: Dispatch<Action>;
	isError?: boolean;
	valueSuggestion: DaDataAddressSuggestion | undefined;
	handlPoints?: (
		suggestion: DaDataSuggestion<DaDataAddress> | undefined
	) => void;
	error?: string[];
	isLoadingCdek?: boolean;
};

const AddressCitySelect = ({
	input,
	valueSuggestion,
	isError,
	handlPoints,
	error,
	isLoadingCdek,
}: AddressCitySelectProps) => {
	return (
		<InputGroup w="300px" zIndex={10}>
			<FormControl isInvalid={isError}>
				<AddressSuggestions
					token={process.env.NEXT_PUBLIC_API_DADATA as string}
					value={valueSuggestion}
					onChange={(suggestion) => handlPoints?.(suggestion)}
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
					{error?.find((error) => error === 'Выбери город доставки')}
				</FormErrorMessage>
			</FormControl>
		</InputGroup>
	);
};

export default AddressCitySelect;
