import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
	Textarea,
} from '@chakra-ui/react';
import { IMaskInput } from 'react-imask';
import { userContactInfo } from '~/constants/userContactInfo';
import { useNewOrder, type NewOrderInput } from '~/stores/useNewOrder';
import PromoInput from './PromoInput';
import SelectAddress from './SelectAddress';

const Inputs = () => {
	const setInput = useNewOrder((state) => state.setInput);
	const error = useNewOrder((state) => state.error);
	const inputs = useNewOrder((state) => state.inputs);
	const resetError = useNewOrder((state) => state.resetError);
	return (
		<Stack w={300} gap={3}>
			{userContactInfo.map(({ name, placeholder, id, label }) => (
				<FormControl key={id} isInvalid={error?.[name] !== undefined}>
					<FormLabel htmlFor={name}>{label}</FormLabel>
					<Input
						_placeholder={{
							fontSize: '14px',
						}}
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
			<FormControl>
				<FormLabel>Комметарий к заказу</FormLabel>
				<Textarea
					placeholder="Ваши пожелания, специфика размера, вопросы"
					_placeholder={{
						fontSize: '14px',
					}}
					onChange={(e) => {
						if (error !== undefined) resetError();
						setInput({ ...inputs, comment: e.target.value });
					}}
				/>
			</FormControl>
			<PromoInput />
		</Stack>
	);
};

export default Inputs;
