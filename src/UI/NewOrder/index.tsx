import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import YandexMap from '~/UI/YandexMaps/YandexMap';
import { useNewOrder } from '~/stores/useNewOrder';
import { api } from '~/utils/api';
import UserAddressCard from '../UserProfile/UserAddress/UserAddressCard';
import CdekPointCard from './CdekPointCard';
import Inputs from './Inputs';
import NewOrderAction from './NewOrderAction';
import OrderItems from './OrderItems';

const NewOrder = () => {
	const controls = useNewOrder((state) => state.controls);
	const setPoint = useNewOrder((state) => state.setPoint);
	const { data: user } = api.users.get.useQuery();
	return (
		<Stack alignItems="center" gap={10}>
			<Stack direction="row" gap={5}>
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
						<Stack alignItems="center">
							{controls.showMap && <YandexMap />}
							{controls.showPVZ && <CdekPointCard />}
							<OrderItems show={controls.selectedPVZ} />
						</Stack>
					</>
				)}
			</Stack>
			<OrderItems
				show={
					controls.showMap || (!controls.showMap && !controls.showPVZ)
				}
			/>
			<NewOrderAction />
		</Stack>
	);
};

export default NewOrder;
