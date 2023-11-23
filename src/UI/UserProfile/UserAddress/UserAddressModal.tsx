import {
	Button,
	Checkbox,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	useToast,
} from '@chakra-ui/react';
import CdekPointCard from '~/UI/NewOrder/CdekPointCard';
import Inputs from '~/UI/NewOrder/Inputs';
import YandexMap from '~/UI/YandexMaps/YandexMap';
import { useNewOrder } from '~/stores/useNewOrder';
import { api } from '~/utils/api';
type UserAddressModalProps = {
	isOpen: boolean;
	onClose: () => void;
};
const UserAddressModal = ({ isOpen, onClose }: UserAddressModalProps) => {
	const { controls, inputs, address, setClear, setPoint, setControls } =
		useNewOrder();
	const { mutate: create, isLoading } =
		api.addresses.createByUser.useMutation();
	const { contactPhone, firstName, lastName } = inputs;
	const toast = useToast();
	const ctx = api.useContext();
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader textAlign="center">Создать адрес</ModalHeader>
				<ModalCloseButton />
				<ModalBody as={Stack} alignItems="center">
					<Inputs />
					<Checkbox
						colorScheme="telegram"
						defaultChecked
						isChecked={address.updateName ?? true}
						onChange={(e) =>
							setPoint({ updateName: e.target.checked })
						}
					>
						Обновить имя профиля?
					</Checkbox>
					{controls.showMap && <YandexMap />}
					{controls.showPVZ && <CdekPointCard />}
				</ModalBody>
				<ModalFooter gap={10}>
					<Button
						isLoading={isLoading}
						colorScheme="telegram"
						onClick={() => {
							if (!controls.selectedPVZ) {
								toast({
									description: 'Подтвердите пункт выдачи',
									status: 'warning',
									isClosable: true,
								});
								setControls({ errorSelectedPVZ: true });
							} else {
								create(
									{
										contactPhone,
										firstName,
										lastName,
										point: address.selectedPoint
											?.addressFullName as string,
										updateName: address.updateName ?? true,
									},
									{
										onSuccess: () => {
											void ctx.users.invalidate();
											toast({
												description:
													'Адрес успешно создан! 😎',
												status: 'success',
												isClosable: true,
											});
											onClose();
											setClear();
										},
									}
								);
							}
						}}
					>
						Создать
					</Button>
					<Button colorScheme="red" onClick={onClose}>
						Отмена
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default UserAddressModal;
