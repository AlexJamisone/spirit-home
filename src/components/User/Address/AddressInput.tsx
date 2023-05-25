import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { type ChangeEvent } from 'react';
import { IMaskInput } from 'react-imask';
import { inputFildsAddress } from '~/constants/inputFildsAddress';
import { useCreateAddressContext } from '~/context/addressContext';

const AddressInput = () => {
	const { dispatch, input, error, initialRef, action, isError } =
		useCreateAddressContext();
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
							inputRef={name === 'firstName' ? initialRef : null}
							as={IMaskInput}
							mask={name === 'phone' ? '+{7}(000)000-00-00' : ''}
							type="text"
							name={name}
							placeholder={placeholder}
							value={value ?? ''}
							onChange={(e) => {
								handlInput(e);
								action?.();
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
		</>
	);
};

export default AddressInput;
