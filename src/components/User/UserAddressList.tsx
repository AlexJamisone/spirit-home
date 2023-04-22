import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import type { Dispatch, SetStateAction } from 'react';
import type { Action, InputAddressState } from '~/reducer/InputAddressReducer';
import { api } from '~/utils/api';
import AddressCreate from '../AddressCreate';
import type { Info } from '../NewOrder';
import UserAddressCard from './UserAddressCard';

type UserAddressListPorps = {
	address: string;
	setAddress: Dispatch<SetStateAction<string>>;
	input: InputAddressState;
	dispatch: Dispatch<Action>;
	info: Info;
	setInfo: Dispatch<SetStateAction<Info>>;
	isAuth: boolean | undefined;
};

const UserAddressList = ({
	address,
	setAddress,
	dispatch,
	info,
	input,
	setInfo,
	isAuth,
}: UserAddressListPorps) => {
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
				{user.address?.filter((address) => !address.archived).length ===
				0 ? (
					<AddressCreate
						dispatch={dispatch}
						info={info}
						input={input}
						setInfo={setInfo}
						isAuth={isAuth}
					/>
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
