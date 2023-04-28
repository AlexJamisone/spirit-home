import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useNewOrderContext } from '~/context/orderContext';
import { api } from '~/utils/api';
import AddressCreate from '../AddressCreate';
import UserAddressCard from './UserAddressCard';

const UserAddressList = () => {
	const { data: user } = api.users.get.useQuery();
	const { input, dispatch } = useNewOrderContext();
	if (!user) return null;
	return (
		<RadioGroup
			onChange={(value) =>
				dispatch({ type: 'SET_ID_ADDRESS', payload: value })
			}
			value={input.idAddress}
		>
			<Stack
				direction="row"
				gap={3}
				flexWrap="wrap"
				justifyContent="center"
			>
				{user.address?.filter((address) => !address.archived).length ===
				0 ? (
					<AddressCreate/>
				) : (
					user.address
						?.filter((address) => !address.archived)
						?.map((address) => (
							<Radio key={address.id} value={address.id}>
								<UserAddressCard
									address={address}
									email={user.email}
									firstName={user.firstName}
									lastName={user.lastName}
									cantEdit={true}
								/>
							</Radio>
						))
				)}
			</Stack>
		</RadioGroup>
	);
};

export default UserAddressList;
