import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Radio,
	RadioGroup,
	Stack,
	TabPanel,
} from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { discounts } from '~/constants/discounts';
import {
	DiscountInputValue,
	DiscountRadioValue,
	useDiscount,
} from '~/stores/useDiscount';

const DiscountInputs = () => {
	const { inputs, radio, setInputs, setRadio, error } = useDiscount();
	const handlRadio = (value: string, name: string) => {
		setRadio({ [name]: value } as DiscountRadioValue);
	};
	const handlInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setInputs({
			[name]: name === 'value' ? +value : value,
		} as DiscountInputValue);
	};
	return (
		<TabPanel>
			<Stack>
				{discounts.map(
					({ type, placeholder, filds, name, id, label, tp}) =>
						type === 'input' ? (
							<FormControl
								key={id}
								isInvalid={
									error?.isError &&
									error.error[name] !== undefined
								}
							>
								<FormLabel>{label}</FormLabel>
								<Input
									name={name}
									placeholder={placeholder}
									value={
										inputs[name as keyof DiscountInputValue]
									}
									onChange={handlInput}
                                    type={tp}
								/>
								<FormErrorMessage>
									{error?.error[name]}
								</FormErrorMessage>
							</FormControl>
						) : (
							<FormControl key={name}>
								<FormLabel>{label}</FormLabel>
								<RadioGroup
									value={
										radio[name as keyof DiscountRadioValue]
									}
									name={name}
									onChange={(value) =>
										handlRadio(value, name)
									}
								>
									<Stack direction={'row'}>
										{filds?.map(({ title, value }) => (
											<Radio key={value} value={value}>{title}</Radio>
										))}
									</Stack>
								</RadioGroup>
							</FormControl>
						)
				)}
			</Stack>
		</TabPanel>
	);
};
export default DiscountInputs;
