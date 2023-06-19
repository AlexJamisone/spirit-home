import { Stack } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import type { ReactNode } from 'react';
import type { CreateAddressContext } from '~/context/addressContext';
import AddressContext from '~/context/addressContext';
import YandexMap from '../../YandexMaps/YandexMap';
import UserCreater from '../UserCreater';
import AddressCitySelect from './AddressCitySelect';
import AddressInput from './AddressInput';
import AddressPointCard from './AddressPointCard';

interface AddressCreateProps extends CreateAddressContext {
	inputFilds?: ReactNode;
	citySelect?: ReactNode;
	pointCard?: ReactNode;
	map?: ReactNode;
}

const AddressCreate = ({
	dispatch,
	handlPoints,
	input,
	valueSuggestion,
	action,
	error,
	initialRef,
	isError,
	isLoadingCdek,
	points,
	citySelect,
	inputFilds,
	map,
	pointCard,
}: AddressCreateProps) => {
	const { isSignedIn } = useAuth();
	return (
		<AddressContext.Provider
			value={{
				dispatch,
				handlPoints,
				input,
				valueSuggestion,
				action,
				error,
				initialRef,
				isError,
				isLoadingCdek,
				points,
			}}
		>
			<Stack justifyContent="center" alignItems="center" gap={3}>
				{inputFilds}
				{citySelect}
				{pointCard}
				{input.showMap ? map : null}
				{isSignedIn ? null : <UserCreater />}
			</Stack>
		</AddressContext.Provider>
	);
};

AddressCreate.Input = AddressInput;
AddressCreate.City = AddressCitySelect;
AddressCreate.Point = AddressPointCard;
AddressCreate.Map = YandexMap;

export default AddressCreate;
