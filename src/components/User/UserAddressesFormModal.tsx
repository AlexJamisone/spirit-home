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
import type { Point } from '@prisma/client';
import React, {
	type ChangeEvent,
	type Dispatch,
	type SetStateAction,
} from 'react';
import { IMaskInput } from 'react-imask';
import { inputFildsAddress } from '~/constants/inputFildsAddress';

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
				break;
			case 'phone':
				dispatch({ type: 'SET_PHONE', payload: value });
				break;
			// case 'cdek':
			// 	dispatch({ type: 'SET_POINT', payload: value });
			// 	break;
			default:
				break;
		}
	};
	const handleSubmit = () => {
		if (edit) {
			updateAddress(
				{
					id: input.id,
					contactPhone: input.contactPhone,
					point: input.point as Point,
					firstName: input.firstName,
					lastName: input.lastName,
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
					firstName: input.firstName,
					lastName: input.lastName,
					contactPhone: input.contactPhone,
					point: input.point as Point,
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
					<ModalHeader fontSize={[16, 19]}>
						Добавить Адрес
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack direction="column" gap={[1, 5]}>
							{inputFildsAddress(input).map(
								({ name, placeholder, value }) => (
									<React.Fragment key={name}>
										<FormLabel fontSize={[12, 16]}>
											{placeholder}
										</FormLabel>
										<Input
											as={IMaskInput}
											mask={
												name === 'phone'
													? '+{7}(000)000-00-00'
													: false
											}
											size={['sm', 'md']}
											fontSize={[12, 16]}
											type="text"
											placeholder={placeholder}
											value={value ?? ''}
											name={name}
											onChange={(e) => handlInput(e)}
										/>
									</React.Fragment>
								)
							)}
						</Stack>
					</ModalBody>
					<ModalFooter gap={5}>
						<Button
							size={['sm', 'md']}
							isLoading={edit ? updateLoading : createLoading}
							type="submit"
						>
							{edit ? 'Обновить' : 'Сохранить'}
						</Button>
						<Button
							size={['sm', 'md']}
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
