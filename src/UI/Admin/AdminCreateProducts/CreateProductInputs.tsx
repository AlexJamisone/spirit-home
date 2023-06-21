import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Textarea,
} from '@chakra-ui/react';
import { createProductInput } from '~/constants/createProductInput';
import { useCreateProductContext } from '~/context/createProductContext';

const CreateProductInputs = () => {
	const { form, dispatch, handleInputChange, error, isError, reset } =
		useCreateProductContext();
	return (
		<>
			{createProductInput(form, error).map(
				({ name, placeholder, type, value, textarea, error }) => (
					<FormControl
						key={placeholder}
						isInvalid={isError && error !== undefined}
					>
						<FormLabel>{placeholder}</FormLabel>
						{textarea ? (
							<>
								<Textarea
									placeholder={placeholder}
									value={value}
									h="200px"
									onChange={(e) => {
										reset();
										dispatch({
											type: 'SET_DESCR',
											payload: e.target.value,
										});
									}}
								/>
								<FormErrorMessage fontWeight={600}>
									{error}
								</FormErrorMessage>
							</>
						) : (
							<>
								<Input
									placeholder={placeholder}
									type={type}
									value={value}
									name={name}
									onChange={handleInputChange}
								/>
								<FormErrorMessage fontWeight={600}>
									{error}
								</FormErrorMessage>
							</>
						)}
					</FormControl>
				)
			)}
		</>
	);
};

export default CreateProductInputs;
