import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import type { Dispatch, SetStateAction } from 'react';
import { api } from '~/utils/api';
import UserAddressCard from './UserAddressCard';

type UserAddressListPorps = {
	address: string;
	setAddress: Dispatch<SetStateAction<string>>;
};

const UserAddressList = ({ address, setAddress }: UserAddressListPorps) => {
	const { data: user } = api.users.get.useQuery();
	if (!user) return null;

	return (
		<RadioGroup onChange={setAddress} value={address}>
			<Stack
				direction="row"
				gap={3}
				flexWrap="wrap"
				justifyContent="center"
			>
				{user.address?.map((address) => (
					<Radio key={address.id} value={address.id}>
						<UserAddressCard
							address={address}
							email={user.email}
							firstName={user.firstName}
							lastName={user.lastName}
							cantEdit={true}
						/>
					</Radio>
				))}
			</Stack>
		</RadioGroup>
	);
};

export default UserAddressList;
