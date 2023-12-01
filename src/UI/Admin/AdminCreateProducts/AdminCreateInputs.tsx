import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
	Textarea,
} from '@chakra-ui/react';
import { createProductInput } from '~/constants/createProductInput';
import {
	useCreateProduct,
	type CreateProductInput,
} from '~/stores/useCreateProduct';

const AdminCreateInputs = () => {
	const { error, input, setInput } = useCreateProduct();
	return (
		<Stack>
			{createProductInput.map(
				({ name, placeholder, type, textarea, label, id }) => (
					<FormControl
						key={id}
						isInvalid={
							error?.isError && error.msg[name] !== undefined
						}
					>
						<FormLabel>{label}</FormLabel>
						<Input
							value={input[name]}
							placeholder={placeholder}
							type={type}
							as={textarea ? Textarea : undefined}
							onChange={(e) =>
								setInput({
									[name]:
										name === 'price'
											? e.target.valueAsNumber
											: e.target.value,
								} as CreateProductInput)
							}
						/>
						<FormErrorMessage>{error?.msg[name]}</FormErrorMessage>
					</FormControl>
				)
			)}
		</Stack>
	);
};

export default AdminCreateInputs;
