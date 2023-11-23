import { Button } from '@chakra-ui/react';
import { useCart } from '~/context/cartContext';
import { useNewOrder } from '~/stores/useNewOrder';
import { api } from '~/utils/api';

const NewOrderAction = () => {
	const { mutate: createNoAddress } =
		api.orders.createNoAddressIsAuth.useMutation();
	const { inputs, address, setError } = useNewOrder();
	const { cartState, cartDispatch } = useCart();
	return (
		<Button
			onClick={() =>
				createNoAddress(
					{
						contactPhone: inputs.contactPhone,
						firstName: inputs.firstName,
						lastName: inputs.lastName,
						point: address?.selectedPoint
							?.addressFullName as string,
						cart: cartState,
					},
					{
						onError: (error) => {
							const err = error.data?.zodError?.fieldErrors;
							setError(err);
						},
					}
				)
			}
			colorScheme="green"
		>
			Оформить заказ
		</Button>
	);
};

export default NewOrderAction;
