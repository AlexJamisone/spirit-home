import { FormErrorMessage, Input } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { ChangeEvent } from 'react';
import React from 'react';
import { IMaskInput } from 'react-imask';
import { inputFildsAddress } from '~/constants/inputFildsAddress';
import { useNewOrderContext } from '~/context/orderContext';
import UserCreater from './User/UserCreater';

const AddressCreate = () => {
	const { dispatch, input, initialRef, isSignedIn, reset } =
		useNewOrderContext();
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
	return (
		<>
			{inputFildsAddress(input).map(
				({ name, placeholder, value, errorMessage }, index) => (
					<React.Fragment key={name}>
						<Input
							inputRef={name === 'firstName' ? initialRef : null}
							as={IMaskInput}
							mask={
								name === 'phone' ? '+{7}(000)000-00-00' : false
							}
							type="text"
							name={name}
							w={['300px']}
							placeholder={placeholder}
							value={value ?? ''}
							onChange={(e) => {
								reset();
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
					</React.Fragment>
				)
			)}
			{isSignedIn ? null : <UserCreater />}
		</>
	);
};

export default AddressCreate;
