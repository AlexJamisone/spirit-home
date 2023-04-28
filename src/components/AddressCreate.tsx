import { Input } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { IMaskInput } from 'react-imask';
import { inputFildsAddress } from '~/constants/inputFildsAddress';
import { useNewOrderContext } from '~/context/orderContext';
import UserCreater from './User/UserCreater';

const AddressCreate = () => {
	const { dispatch, input, initialRef, isSignedIn } = useNewOrderContext();
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
			{inputFildsAddress(input).map(({ name, placeholder, value }) => (
				<Input
					key={name}
					inputRef={name === 'firstName' ? initialRef : null}
					as={IMaskInput}
					mask={name === 'phone' ? '+{7}(000)000-00-00' : false}
					type="text"
					name={name}
					w={['300px']}
					placeholder={placeholder}
					value={value ?? ''}
					onChange={(e) => {
						handlInput(e);
					}}
				/>
			))}
			{isSignedIn ? null : <UserCreater />}
		</>
	);
};

export default AddressCreate;
