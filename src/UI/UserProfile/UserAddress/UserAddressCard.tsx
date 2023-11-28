import { Icon, IconButton, Stack, Text, useToast } from '@chakra-ui/react';
import type { Address } from '@prisma/client';
import { motion } from 'framer-motion';
import { RiDeleteBinLine } from 'react-icons/ri';
import { api } from '~/utils/api';

type UserAddressCardProps = {
	address: Address;
};

const UserAddressCard = ({ address }: UserAddressCardProps) => {
	const { mutate: deletAddress, isLoading } =
		api.addresses.delete.useMutation();
	const toast = useToast();
	const ctx = api.useContext();
	return (
		<Stack
			maxW={200}
			boxShadow="base"
			p={5}
			rounded="2xl"
			fontSize={12}
			position="relative"
			as={motion.div}
			layout
			exit={{
				opacity: 0,
				transition: {
					type: 'spring',
					duration: 0.2,
				},
			}}
		>
			<Text>Имя: {address.firstName}</Text>
			<Text>Фамилия: {address.lastName}</Text>
			<Text>Телефон: {address.contactPhone}</Text>
			<Text>ПВЗ: {address.point}</Text>
			<IconButton
				aria-label="delet"
				colorScheme="red"
				icon={<Icon as={RiDeleteBinLine} />}
				size="xs"
				position="absolute"
				right={3}
				isLoading={isLoading}
				onClick={() =>
					deletAddress(
						{ id: address.id },
						{
							onSuccess: () => {
								void ctx.users.invalidate();
								toast({
									description: 'Адрес успешно удалён! 👀',
									status: 'info',
									isClosable: true,
								});
							},
						}
					)
				}
			/>
		</Stack>
	);
};

export default UserAddressCard;
