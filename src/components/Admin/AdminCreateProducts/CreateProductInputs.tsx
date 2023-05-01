import { FormLabel, Input, Stack, Textarea } from '@chakra-ui/react';
import { createProductInput } from '~/constants/createProductInput';
import { useCreateProductContext } from '~/context/createProductContext';

const CreateProductInputs = () => {
	const { form, dispatch, handleInputChange } = useCreateProductContext();
	return (
		<>
			{createProductInput(form).map(
				({ name, placeholder, type, value, textarea }) => (
					<Stack key={placeholder}>
						<FormLabel>{placeholder}</FormLabel>
						{textarea ? (
							<Textarea
								placeholder={placeholder}
								value={value}
								h="200px"
								onChange={(e) =>
									dispatch({
										type: 'SET_DESCR',
										payload: e.target.value,
									})
								}
							/>
						) : (
							<Input
								placeholder={placeholder}
								type={type}
								value={value}
								name={name}
								onChange={handleInputChange}
							/>
						)}
					</Stack>
				)
			)}
		</>
	);
};

export default CreateProductInputs;
