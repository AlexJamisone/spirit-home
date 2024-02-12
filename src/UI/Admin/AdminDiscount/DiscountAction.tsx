import { Button, Stack, useToast } from '@chakra-ui/react';
import { useDateRange } from '~/stores/useDateRange';
import { useDiscount } from '~/stores/useDiscount';
import { useHelper } from '~/stores/useHelpers';
import { api } from '~/utils/api';

const DiscountAction = () => {
	const radio = useDiscount((state) => state.radio);
	const inputs = useDiscount((state) => state.inputs);
	const date = useDateRange((state) => state.send);
	const setClear = useDiscount((state) => state.setClear);
	const setError = useDiscount((state) => state.setError);
	const catIds = useHelper((state) => state.categotys.ids);
	const productIds = useHelper((state) => state.product.ids);
	const setHelpClear = useHelper((state) => state.setClear);
	const { mutate: create, isLoading } = api.discount.create.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const handlClick = () => {
		create(
			{
				date: [date[0]!, date[1]!],
				value: inputs.value,
				code: inputs.code,
				protection: radio.protection,
				type: radio.type,
				max: inputs.max,
				path: {
					catIds,
					productIds,
				},
			},
			{
				onSuccess: ({ msg  }) => {
					void ctx.discount.invalidate();
					toast({
						description: msg,
						status: 'success',
						isClosable: true,
					});
					setClear();
					setHelpClear();
				},
				onError: ({ data, message }) => {
					const err = data?.zodError?.fieldErrors;
					if (err) {
						setError({ isError: true, error: err });
					} else {
						toast({
							description: message,
							status: 'error',
							isClosable: true,
						});
					}
				},
			}
		);
	};
	return (
		<Stack>
			<Button
				isLoading={isLoading}
				variant="outline"
				w="100%"
				onClick={handlClick}
			>
				Создать
			</Button>
		</Stack>
	);
};
export default DiscountAction;
