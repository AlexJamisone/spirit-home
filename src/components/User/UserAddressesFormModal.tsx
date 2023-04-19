import {
	Button,
	FormControl,
	FormLabel,
	Input,
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
import React, {
	type ChangeEvent,
	type Dispatch,
	type SetStateAction,
} from 'react';

import type { Action, InputAddressState } from '~/reducer/InputAddressReducer';
import { api } from '~/utils/api';

type UserAddressesFormModalProps = {
	isOpen: boolean;
	onClose: () => void;
	input: InputAddressState;
	dispatch: Dispatch<Action>;
	edit: boolean;
	setEdit: Dispatch<SetStateAction<boolean>>;
};

const UserAddressesFormModal = ({
	isOpen,
	onClose,
	dispatch,
	input,
	edit,
	setEdit,
}: UserAddressesFormModalProps) => {
	const { mutate: createByUser, isLoading: createLoading } =
		api.addresses.createByUser.useMutation();
	const { mutate: updateAddress, isLoading: updateLoading } =
		api.addresses.update.useMutation();

	const toast = useToast();

	const ctx = api.useContext();
	const handlInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		switch (name) {
			case 'firstName':
				dispatch({ type: 'SET_NAME', payload: value });
				break;
			case 'lastName':
				dispatch({ type: 'SET_LAST_NAME', payload: value });
				break;
			case 'city':
				dispatch({ type: 'SET_CITY', payload: value });
				break;
			case 'phone':
				dispatch({ type: 'SET_PHONE', payload: value });
				break;
			case 'cdek':
				dispatch({ type: 'SET_POINT', payload: value });
				break;
			default:
				break;
		}
	};
	const handleSubmit = () => {
		if (edit) {
			updateAddress(
				{
					id: input.id,
					city: input.citys,
					contactPhone: input.contactPhone,
					point: input.point,
					firstName: input.firstName as string,
					lastName: input.lastName as string,
				},
				{
					onSuccess: () => {
						toast({
							description: `Адрес успешно обновлён!🌊`,
							status: 'info',
							isClosable: true,
						});
						void ctx.users.invalidate();
						dispatch({ type: 'SET_CLEAR' });
						setEdit(false);
						onClose();
					},
				}
			);
		} else {
			createByUser(
				{
					firstName: input.firstName as string,
					lastName: input.lastName as string,
					city: input.citys,
					contactPhone: input.contactPhone,
					point: input.point,
				},
				{
					onSuccess: () => {
						toast({
							description: `Адрес успешно создан!🚀`,
							status: 'success',
							isClosable: true,
						});
						dispatch({ type: 'SET_CLEAR' });
						void ctx.users.invalidate();
						onClose();
					},
				}
			);
		}
	};
	const inputFilds = [
		{
			placeholder: 'Имя',
			value: input.firstName,
			name: 'firstName',
		},
		{
			placeholder: 'Фамилия',
			value: input.lastName,
			name: 'lastName',
		},
		{
			placeholder: 'Город',
			value: input.citys,
			name: 'city',
		},
		{
			placeholder: 'Телефон',
			value: input.contactPhone,
			name: 'phone',
		},
		{
			placeholder: 'СДЭК ПВЗ',
			value: input.point,
			name: 'cdek',
		},
	];
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				dispatch({ type: 'SET_CLEAR' });
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent>
				<FormControl
					as="form"
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
				>
					<ModalHeader>Добавить Адрес</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack direction="column" gap={5}>
							{inputFilds.map(({ name, placeholder, value }) => (
								<React.Fragment key={name}>
									<FormLabel>{placeholder}</FormLabel>
									<Input
										type="text"
										placeholder={placeholder}
										value={value ?? ''}
										name={name}
										onChange={(e) => handlInput(e)}
									/>
								</React.Fragment>
							))}
						</Stack>
					</ModalBody>
					<ModalFooter gap={5}>
						<Button
							isLoading={edit ? updateLoading : createLoading}
							type="submit"
						>
							{edit ? 'Обновить' : 'Сохранить'}
						</Button>
						<Button
							onClick={() => {
								dispatch({ type: 'SET_CLEAR' });
								onClose();
							}}
						>
							Oтмена
						</Button>
					</ModalFooter>
				</FormControl>
			</ModalContent>
		</Modal>
	);
};

export default UserAddressesFormModal;
