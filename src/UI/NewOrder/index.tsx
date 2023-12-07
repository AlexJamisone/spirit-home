import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import YandexMap from '~/UI/YandexMaps/YandexMap';
import { useNewOrder } from '~/stores/useNewOrder';
import { api } from '~/utils/api';
import UserAddressCard from '../UserProfile/UserAddress/UserAddressCard';
import CdekPointCard from './CdekPointCard';
import Inputs from './Inputs';
import NewOrderAction from './NewOrderAction';

const NewOrder = () => {
	// const { controls, setPoint } = useNewOrder();
	const controls = useNewOrder((state) => state.controls);
	const setPoint = useNewOrder((state) => state.setPoint);
	const { data: user } = api.users.get.useQuery();
	return (
		<Stack alignItems="center" gap={10}>
			<Stack direction="row">
				{user && user.address?.length !== 0 ? (
					<RadioGroup
						onChange={(id) => setPoint({ id })}
						display="flex"
						gap={5}
					>
						{user?.address?.map((address) => (
							<Radio key={address.id} value={address.id}>
								<UserAddressCard address={address} />
							</Radio>
						))}
					</RadioGroup>
				) : (
					<>
						<Inputs />
						{controls.showMap && <YandexMap />}
					</>
				)}
			</Stack>
			{controls.showPVZ && <CdekPointCard />}
			<NewOrderAction />
		</Stack>
	);
};

export default NewOrder;
