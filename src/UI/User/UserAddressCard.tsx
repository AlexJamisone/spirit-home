import { Icon, IconButton, Stack, Text } from '@chakra-ui/react';
import type { Address, Point } from '@prisma/client';
import { motion } from 'framer-motion';
import { BsTrashFill } from 'react-icons/bs';
type UserAddressCardProps = {
	address: Address & {
		point: Point | null;
	};
	firstName: string | null;
	lastName: string | null;
	email: string | null | undefined;
	isLoading?: boolean;
	handlEdit?: (
		address: Address & {
			point: Point | null;
		}
	) => void;
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
	const { contactPhone, id, point, firstName, lastName } = address;
	return (
		<Stack
			as={motion.div}
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0 }}
			whileHover={{
				scale: 1.01,
				transition: { type: 'spring', duration: 0.1 },
			}}
			direction={['column']}
			gap={[1, 1]}
			boxShadow="lg"
			rounded="2xl"
			p={[3, 5]}
			maxW={'300px'}
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
			<Text>СДЭК ПВЗ: {point?.addressFullName}</Text>
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
