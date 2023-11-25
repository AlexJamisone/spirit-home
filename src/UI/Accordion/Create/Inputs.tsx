import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
	Textarea,
} from '@chakra-ui/react';
import { accordionsInput } from '~/constants/accordions';
import { useAccordion, type AccordionState } from '~/stores/useAccordion';

const Inputs = () => {
	const { input, setInput, error, rest } = useAccordion();
	return (
		<Stack>
			{accordionsInput.map(
				({ isTextArea, label, name, placeholder, type, id }) => (
					<FormControl
						key={id}
						isInvalid={
							error?.isError && error.msg?.[name] !== undefined
						}
					>
						<FormLabel>{label}</FormLabel>
						<Input
							type={type}
							name={name}
							as={isTextArea ? Textarea : undefined}
							placeholder={placeholder}
							value={input[name]}
							onChange={(e) => {
								if (error?.isError) {
									rest();
								}
								setInput({
									[name]: e.target.value,
								} as AccordionState['input']);
							}}
						/>
						<FormErrorMessage>
							{error?.msg?.[name]}
						</FormErrorMessage>
					</FormControl>
				)
			)}
		</Stack>
	);
};

export default Inputs;
