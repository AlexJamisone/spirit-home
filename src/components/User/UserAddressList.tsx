import { Radio, RadioGroup } from '@chakra-ui/react';
import { useNewOrderContext } from '~/context/orderContext';
import { api } from '~/utils/api';
import AddressCreate from './Address/Address';
import UserAddressCard from './UserAddressCard';

const UserAddressList = () => {
	const { data: user } = api.users.get.useQuery();
	const { input, dispatch, isError } = useNewOrderContext();
	if (!user) return null;
	return (
		<>
			{user.address?.filter((address) => !address.archived).length ===
			0 ? (
				<AddressCreate />
			) : (
				<>
					<RadioGroup
						onChange={(value) =>
							dispatch({ type: 'SET_ID_ADDRESS', payload: value })
						}
						value={input.idAddress}
						justifyContent="center"
						display="flex"
						gap={7}
					>
						{user.address
							?.filter((address) => !address.archived)
							?.map((address) => (
								<Radio
									key={address.id}
									value={address.id}
									isInvalid={isError}
								>
									<UserAddressCard
										address={address}
										email={user.email}
										firstName={user.firstName}
										lastName={user.lastName}
										cantEdit={true}
									/>
								</Radio>
							))}
					</RadioGroup>
				</>
			)}
		</>
	);
};

export default UserAddressList;
