import {
	FormControl,
	Input,
	InputGroup,
	InputRightElement,
	Spinner,
} from '@chakra-ui/react';
import { useRef } from 'react';
import {
	AddressSuggestions,
	type DaDataAddress,
	type DaDataSuggestion,
} from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { useNewOrder } from '~/stores/useNewOrder';
import { api } from '~/utils/api';

const SelectAddress = () => {
	const { mutate: getPoints, isLoading } = api.cdek.getPoints.useMutation();
	const setControls = useNewOrder((state) => state.setControls);
	const address = useNewOrder((state) => state.address);
	const controls = useNewOrder((state) => state.controls);
	const setPoint = useNewOrder((state) => state.setPoint);
	const suggestionsRef = useRef<AddressSuggestions>(null);

	const handlPoints = (
		suggestion: DaDataSuggestion<DaDataAddress> | undefined
	) => {
		setPoint({ valueSuggestion: suggestion });
		getPoints(
			{ city: suggestion?.data.postal_code as string },
			{
				onSuccess: (points) => {
					setControls({ showMap: true });
					setPoint({ points });
				},
			}
		);
	};
	return (
		<FormControl zIndex={10}>
			<InputGroup>
				<AddressSuggestions
					token={process.env.NEXT_PUBLIC_API_DADATA as string}
					onChange={(suggestion) => {
						handlPoints(suggestion);
					}}
					value={address.valueSuggestion}
					inputProps={{
						placeholder: 'Введите ваш город',
						disabled: controls.selectedPVZ,
						width: '300px',
					}}
					filterFromBound="city"
					filterToBound="city"
					renderOption={(suggestion) => suggestion.data.city}
					autoload={true}
					customInput={Input}
					ref={suggestionsRef}
					selectOnBlur={true}
				/>
				<InputRightElement>
					{isLoading && <Spinner size="sm" />}
				</InputRightElement>
			</InputGroup>
		</FormControl>
	);
};

export default SelectAddress;
