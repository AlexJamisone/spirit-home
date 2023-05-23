import { useNewOrderContext } from '~/context/orderContext';
import AddressCreate from '../User/Address/Address';
import UserAddressList from '../User/UserAddressList';

const NewOrderAddress = () => {
	const { isSignedIn } = useNewOrderContext();
	return <>{isSignedIn ? <UserAddressList /> : <AddressCreate />}</>;
};

export default NewOrderAddress;
