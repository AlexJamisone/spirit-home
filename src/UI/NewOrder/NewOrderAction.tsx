import { Button } from '@chakra-ui/react';
import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import { useToastOnMutation } from '~/hooks/useToastOnMutation';
import { useCart } from '~/stores/useCart';
import { useNewOrder } from '~/stores/useNewOrder';
import { api } from '~/utils/api';

type Err = TRPCClientErrorBase<DefaultErrorShape>;

const NewOrderAction = () => {
	const { mutate: createNoAddress, isLoading: isLoadingNoAddress } =
		api.orders.createNoAddressIsAuth.useMutation();
	const { mutate: createWithAddressId, isLoading: isLoadingAddressId } =
		api.orders.createWithAddressId.useMutation();
	const inputs = useNewOrder((state) => state.inputs);
	const address = useNewOrder((state) => state.address);
	const setError = useNewOrder((state) => state.setError);
	const items = useCart((state) => state.items);
	const total = useCart((state) => state.total);
	const clear = useCart((state) => state.clear);
	const { toast, router, ctx } = useToastOnMutation();

	const handleSuccess = (orderNumber: number) => {
		void ctx.orders.invalidate();
		void router.push('/');
		toast({
			description: `Заказ №${orderNumber} успешно создан, в ближайшее время с вами свяжутся!`,
			status: 'success',
			duration: Infinity,
			isClosable: true,
		});
		clear();
	};
	const handlNewOrder = () => {
		if (address.id && address.id.length !== 0) {
			createWithAddressId(
				{
					idAddress: address.id,
					cart: {
						items,
						total,
					},
				},
				{
					onError: (error) => {
						const err = error.data?.zodError?.fieldErrors;
						if (err) {
							setError(err);
						} else {
							toast({
								description: error.message,
								status: 'error',
								isClosable: true,
							});
						}
					},
					onSuccess: handleSuccess,
				}
			);
		} else {
			createNoAddress(
				{
					contactPhone: inputs.contactPhone,
					firstName: inputs.firstName,
					lastName: inputs.lastName,
					point: address?.selectedPoint?.addressFullName as string,
					cart: { items, total },
				},
				{
					onError: (error) => {
						const err = error.data?.zodError?.fieldErrors;
						if (err) {
							setError(err);
						} else {
							toast({
								description: error.message,
								status: 'error',
								isClosable: true,
							});
						}
					},
					onSuccess: handleSuccess,
				}
			);
		}
	};
	return (
		<Button
			onClick={handlNewOrder}
			isLoading={isLoadingAddressId || isLoadingNoAddress}
			colorScheme="teal"
		>
			Оформить заказ
		</Button>
	);
};

export default NewOrderAction;
