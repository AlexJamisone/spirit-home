import {
	Button,
	FormControl,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useToast,
} from '@chakra-ui/react';
import type { Point } from '@prisma/client';
import { useRef, useState } from 'react';
import type {
	DaDataAddress,
	DaDataAddressSuggestion,
	DaDataSuggestion,
} from 'react-dadata';

import { motion } from 'framer-motion';
import { useUserMainContext } from '~/context/userMainContext';
import { api } from '~/utils/api';
import AddressCreate from './Address/Address';

type UserAddressesFormModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const UserAddressesFormModal = ({
	isOpen,
	onClose,
}: UserAddressesFormModalProps) => {
	const {
		mutate: createByUser,
		isLoading: createLoading,
		error: errorCreateAddrress,
		isError: isErrorCreate,
	} = api.addresses.createByUser.useMutation();
	const {
		mutate: updateAddress,
		isLoading: updateLoading,
		error: errorUpdateAddress,
		isError: isErrorUpdate,
	} = api.addresses.update.useMutation();
	const {
		mutate: getPoints,
		data: points,
		isLoading: isLoadingCdek,
	} = api.cdek.getPoints.useMutation();
	const { dispatch, input, suggestionsRef } = useUserMainContext();
	const toast = useToast();
	const [valueSuggestion, setValueSuggestion] = useState<
		DaDataAddressSuggestion | undefined
	>();
	const ctx = api.useContext();
	const error =
		errorCreateAddrress?.data?.zodError?.fieldErrors?.address ||
		errorUpdateAddress?.data?.zodError?.fieldErrors?.address;
	const initialFocusRef = useRef<HTMLInputElement>(null);

	const handleSubmit = () => {
		if (input.edit) {
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
						dispatch({ type: 'SET_EDIT', payload: false });
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
	const handlPoints = (
		suggestion: DaDataSuggestion<DaDataAddress> | undefined
	) => {
		setValueSuggestion(suggestion);
		getPoints(
			{ city: suggestion?.data.postal_code as string },
			{
				onSuccess: () => {
					dispatch({ type: 'SET_MAP', payload: true });
				},
			}
		);
	};
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				dispatch({ type: 'SET_CLEAR' });
				onClose();
			}}
			size={'2xl'}
		>
			<ModalOverlay />
			<ModalContent as={motion.section} layout>
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
						<AddressCreate
							dispatch={dispatch}
							input={input}
							handlPoints={handlPoints}
							isError={isErrorCreate || isErrorUpdate}
							isLoadingCdek={isLoadingCdek}
							valueSuggestion={valueSuggestion}
							initialRef={initialFocusRef}
							error={error}
							points={points}
							inputFilds={<AddressCreate.Input />}
							citySelect={<AddressCreate.City />}
							pointCard={<AddressCreate.Point />}
							map={<AddressCreate.Map />}
							suggestionsRef={suggestionsRef}
						/>
					</ModalBody>
					<ModalFooter gap={5}>
						<Button
							size={['sm', 'md']}
							isLoading={
								input.edit ? updateLoading : createLoading
							}
							type="submit"
						>
							{input.edit ? 'Обновить' : 'Сохранить'}
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
