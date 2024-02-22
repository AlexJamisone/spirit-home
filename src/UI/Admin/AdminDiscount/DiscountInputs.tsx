import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Radio,
	RadioGroup,
	Stack,
	TabPanel,
	Text,
} from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { discounts } from '~/constants/discounts';
import {
	DiscountInputValue,
	DiscountRadioValue,
	useDiscount,
} from '~/stores/useDiscount';
import AdminDatePick from '../AdminCharts/AdminDatePick';
import DiscountAction from './DiscountAction';
import DiscountProductTab from './DiscountProductTab';

const DiscountInputs = () => {
	const { inputs, radio, setInputs, setRadio, error, reset } = useDiscount();
	const handlRadio = (value: string, name: string) => {
		setRadio({ [name]: value } as DiscountRadioValue);
	};
	const handlInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name, type } = e.target;
		if (error?.isError) {
			reset();
		}
		setInputs({
			[name]: type === 'number' ? +value : value,
		} as DiscountInputValue);
	};
	return (
		<TabPanel>
			<Stack>
				<FormControl>
					<FormLabel>Выбери дату проведения</FormLabel>
					<AdminDatePick />
				</FormControl>
				{discounts.map(
					({ type, placeholder, filds, name, id, label, tp }) =>
						type === 'input' ? (
							<FormControl
								key={id}
								isInvalid={
									error?.isError &&
									error.error[name] !== undefined
								}
							>
								<FormLabel>
									{label}{' '}
									{name === 'value' &&
										(radio.type === 'PROCENT'
											? 'в %'
											: 'в ₽')}
								</FormLabel>
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
											<Radio key={value} value={value}>
												{title}
											</Radio>
										))}
									</Stack>
								</RadioGroup>
							</FormControl>
						)
				)}
				<DiscountProductTab />
				<Text maxW={300} textAlign="center" textColor="blackAlpha.500">
					* пока что тестирую лучше выбирать либо продукты либо
					категории
				</Text>
				<DiscountAction />
			</Stack>
		</TabPanel>
	);
};
export default DiscountInputs;
