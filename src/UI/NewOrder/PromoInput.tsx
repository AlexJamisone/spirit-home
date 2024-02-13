import {
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightAddon,
	useBoolean,
	useToast,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '~/stores/useCart';
import { useNewOrder } from '~/stores/useNewOrder';
import { api } from '~/utils/api';

const PromoInput = () => {
	const [conf, setConf] = useBoolean();
	const inputs = useNewOrder((state) => state.inputs);
	const setInput = useNewOrder((state) => state.setInput);
	const resetError = useNewOrder((state) => state.resetError);
	const error = useNewOrder((state) => state.error);
	const confirmPromo = useCart((state) => state.confirmPromo);
	const toast = useToast();
	const { mutate: confirm, isLoading } = api.discount.confirm.useMutation();
	const handlConfirm = (promo: string) => {
		confirm(
			{
				promo,
			},
			{
				onSuccess: ({ message, find, value, ids, type }) => {
					if (!find) {
						toast({
							description: message,
							status: 'error',
							isClosable: true,
						});
						return;
					}
					if (!value) {
						toast({
							description: message,
							status: 'info',
						});
						return;
					}
					confirmPromo({ value, ids, type });
					setConf.on();
					toast({
						description: message,
						status: 'success',
						isClosable: true,
					});
				},
			}
		);
	};
	return (
		<FormControl>
			<FormLabel>Промокод</FormLabel>
			<InputGroup>
				<AnimatePresence key={69}>
					<Input
						isDisabled={conf}
						as={motion.input}
						layout="size"
						_placeholder={{
							fontSize: '14px',
						}}
						placeholder="Введите промокод"
						name="promo"
						value={inputs['promo']}
						onChange={(e) => {
							if (error !== undefined) resetError();
							setInput({ ...inputs, promo: e.target.value });
						}}
					/>
					{inputs['promo'] && (
						<InputRightAddon
							w="fit-content"
							h="40px"
							p={0}
							as={motion.div}
							initial={{ opacity: 0, x: 100 }}
							animate={{
								opacity: 1,
								x: 0,
								transition: {
									type: 'spring',
									duration: 0.5,
								},
							}}
							exit={{
								opacity: 0,
								x: 100,
								transition: {
									type: 'spring',
									duration: 0.5,
								},
							}}
						>
							<Button
								fontSize="12px"
								colorScheme="teal"
								borderLeftRadius="0"
								isLoading={isLoading}
								onClick={() => handlConfirm(inputs['promo'])}
							>
								Потвердить
							</Button>
						</InputRightAddon>
					)}
				</AnimatePresence>
			</InputGroup>
		</FormControl>
	);
};
export default PromoInput;
