import {
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightAddon,
	useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useCart } from '~/stores/useCart';
import { useNewOrder } from '~/stores/useNewOrder';
import { api } from '~/utils/api';

const PromoInput = () => {
	const resetError = useNewOrder((state) => state.resetError);
	const error = useNewOrder((state) => state.error);
	const confirmPromo = useCart((state) => state.confirmPromo);
	const isActive = useCart((state) => state.discount.active);
	const wordPromo = useCart((state) => state.discount.word);
	const setPromo = useCart((state) => state.setPromo);
	const cancelPromo = useCart((state) => state.cancelPromo);
	const discount = useCart((state) => state.discount);
	const toast = useToast();
	const { mutate: confirm, isLoading } = api.discount.confirm.useMutation();
	const handlConfirm = (promo: string) => {
		confirm(
			{
				promo,
			},
			{
				onSuccess: ({ message, find, value, ids, type, id }) => {
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
					confirmPromo({ value, ids, type, id, word: promo });
					toast({
						description:
							discount.applyCount > 0
								? message + ` Применилось на ${discount.applyCount} товаров`
								: 'Не было найдено товаров участвующих в акции',
						status:
							discount.applyCount === 0 ? 'warning' : 'success',
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
				<Input
					isDisabled={isActive}
					as={motion.input}
					layout="size"
					_placeholder={{
						fontSize: '14px',
					}}
					placeholder="Введите промокод"
					name="promo"
					value={wordPromo}
					onChange={(e) => {
						if (error !== undefined) resetError();
						setPromo(e.target.value);
					}}
				/>
				{wordPromo && (
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
							colorScheme={isActive ? 'red' : 'teal'}
							borderLeftRadius="0"
							isLoading={isLoading}
							onClick={() => {
								if (isActive) {
									cancelPromo();
								}
								if (!isActive) {
									handlConfirm(wordPromo);
								}
							}}
						>
							{isActive ? 'Отменить' : 'Потвердить'}
						</Button>
					</InputRightAddon>
				)}
			</InputGroup>
		</FormControl>
	);
};
export default PromoInput;
