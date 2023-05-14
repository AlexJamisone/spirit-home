import { Icon, IconButton, Stack, Text } from '@chakra-ui/react';
import type { Address } from '@prisma/client';
import { motion } from 'framer-motion';
import { BsTrashFill } from 'react-icons/bs';
type UserAddressCardProps = {
	address: Address;
	firstName: string | null;
	lastName: string | null;
	email: string | null | undefined;
	isLoading?: boolean;
	handlEdit?: (address: Address) => void;
	handlDeletAddress?: (id: string) => void;
	cantEdit?: boolean;
};

const UserAddressCard = ({
	address,
	email,
	handlDeletAddress,
	handlEdit,
	isLoading,
	cantEdit,
}: UserAddressCardProps) => {
	const { city, contactPhone, id, point, firstName, lastName } = address;
	return (
		<Stack
			as={motion.div}
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0 }}
			whileHover={{
				scale: 1.05,
				transition: { type: 'spring', duration: 0.1 },
			}}
			direction={['column']}
			gap={[1, 3]}
			border="1px solid #CBD5E0"
			rounded="2xl"
			p={[3, 5]}
			maxW={['100%']}
			position="relative"
			cursor="pointer"
			transition="all .3s ease-in-out"
			_hover={{
				transform: 'scale(1.05)',
			}}
			onClick={() => (cantEdit ? null : handlEdit?.(address))}
			fontSize={[12, 16]}
		>
			<Text>Имя: {firstName}</Text>
			<Text>Фамилия: {lastName}</Text>
			<Text>Email: {email}</Text>
			<Text>Телефон: {contactPhone}</Text>
			<Text>Город: {city}</Text>
			<Text>СДЭК ПВЗ: {point}</Text>
			{cantEdit ? null : (
				<IconButton
					isLoading={isLoading}
					size={['xs', 'sm']}
					position="absolute"
					top={2}
					right={5}
					aria-label="delet"
					onClick={(e) => {
						handlDeletAddress?.(id);
						e.stopPropagation();
					}}
					icon={<Icon as={BsTrashFill} color="red.400" />}
				/>
			)}
		</Stack>
	);
};

export default UserAddressCard;
