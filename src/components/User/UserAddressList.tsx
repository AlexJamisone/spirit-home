import { AnimatePresence } from 'framer-motion';
import { FaAddressCard } from 'react-icons/fa';
import { useUserMainContext } from '~/context/userMainContext';
import NoData from '../NoData/NoData';
import UserAddressCard from './UserAddressCard';

const UserAddressList = () => {
	const { user, handlDeletAddress, handlEdit, isLoading } =
		useUserMainContext();
	return (
		<AnimatePresence>
			{user.address?.filter((address) => !address.archived).length ===
			0 ? (
				<NoData icon={FaAddressCard} text="Пока что нет адресов" />
			) : (
				user.address
					?.filter((address) => !address.archived)
					.map((address) => {
						return (
							<UserAddressCard
								key={address.id}
								address={address}
								email={user.email}
								firstName={user.firstName}
								lastName={user.lastName}
								handlDeletAddress={handlDeletAddress}
								handlEdit={handlEdit}
								isLoading={isLoading}
							/>
						);
					})
			)}
		</AnimatePresence>
	);
};

export default UserAddressList;
