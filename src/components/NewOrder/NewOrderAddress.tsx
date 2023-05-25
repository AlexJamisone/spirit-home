import { useAuth } from '@clerk/nextjs';
import { useNewOrderContext } from '~/context/orderContext';
import AddressCreate from '../User/Address/Address';
import UserAddressList from '../User/UserAddressList';

const NewOrderAddress = () => {
	const { isSignedIn } = useAuth();
	const {
		dispatch,
		input,
		initialRef,
		resetNoAddress,
		resetNoAuth,
		error,
		isError,
		handlPoints,
		valueSuggestion,
		isLoadingCdek,
		points,
	} = useNewOrderContext();
	return (
		<>
			{isSignedIn ? (
				<UserAddressList />
			) : (
				<AddressCreate
					dispatch={dispatch}
					input={input}
					handlPoints={handlPoints}
					valueSuggestion={valueSuggestion}
					action={() => {
						resetNoAddress();
						resetNoAuth();
					}}
					error={error}
					initialRef={initialRef}
					isError={isError}
					isLoadingCdek={isLoadingCdek}
					points={points}
					inputFilds={<AddressCreate.Input />}
					citySelect={<AddressCreate.City />}
					pointCard={<AddressCreate.Point />}
					map={<AddressCreate.Map />}
				/>
			)}
		</>
	);
};

export default NewOrderAddress;
