import { FormControl, FormErrorMessage, Input, Stack } from '@chakra-ui/react';
import { IMaskInput } from 'react-imask';
import { userContactInfo } from '~/constants/userContactInfo';
import { useNewOrder, type NewOrderInput } from '~/stores/useNewOrder';
import SelectAddress from './SelectAddress';

const Inputs = () => {
	const setInput = useNewOrder((state) => state.setInput);
	const error = useNewOrder((state) => state.error);
	const inputs = useNewOrder((state) => state.inputs);
	const resetError = useNewOrder((state) => state.resetError);
	return (
		<Stack w={300} gap={5}>
			{userContactInfo.map(({ name, placeholder, id }) => (
				<FormControl key={id} isInvalid={error?.[name] !== undefined}>
					<Input
						placeholder={placeholder}
						as={name === 'contactPhone' ? IMaskInput : undefined}
						mask={
							name === 'contactPhone'
								? '+{7}(000)000-00-00'
								: undefined
						}
						name={name}
						value={inputs[name as keyof NewOrderInput]}
						onChange={(e) => {
							if (error !== undefined) resetError();
							setInput({
								[name]: e.target.value,
							} as NewOrderInput);
						}}
					/>
					<FormErrorMessage>{error?.[name]}</FormErrorMessage>
				</FormControl>
			))}
			<SelectAddress />
		</Stack>
	);
};

export default Inputs;
