import { Button, Stack, useDisclosure, useToast } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { FaRegAddressCard } from 'react-icons/fa';
import NoData from '~/components/NoData/NoData';
import { api } from '~/utils/api';
import UserAddressCard from './UserAddressCard';
import UserAddressModal from './UserAddressModal';

const UserAddress = () => {
	const { data: user } = api.users.get.useQuery();
	const { isOpen, onClose, onToggle } = useDisclosure();
	const toast = useToast();
	if (!user) return null;
	return (
		<Stack gap={5}>
			<Stack
				direction="row"
				maxW={450}
				flexWrap="wrap"
				justifyContent="center"
			>
				{user.address?.length === 0 && (
					<NoData
						text="Нет адресов доставки!"
						icon={FaRegAddressCard}
					/>
				)}
				<AnimatePresence>
					{user.address?.map((address) => (
						<UserAddressCard address={address} key={address.id} />
					))}
				</AnimatePresence>
			</Stack>
			<Button
				onClick={() => {
					if (user.address && user.address.length >= 3) {
						toast({
							description: 'Нельзя создать больше 3 адресов 😥',
							status: 'warning',
							isClosable: true,
						});
					} else {
						onToggle();
					}
				}}
				size="sm"
			>
				Добавить адрес
			</Button>
			<UserAddressModal isOpen={isOpen} onClose={onClose} />
		</Stack>
	);
};

export default UserAddress;
