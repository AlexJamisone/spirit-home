import { Button } from '@chakra-ui/react';
import { useCart } from '~/stores/useCart';
import { useNewOrder } from '~/stores/useNewOrder';
import { api } from '~/utils/api';

const NewOrderAction = () => {
	const { mutate: createNoAddress } =
		api.orders.createNoAddressIsAuth.useMutation();
	const { inputs, address, setError } = useNewOrder();
	const { items, total } = useCart();
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
						cart: { items, total },
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
