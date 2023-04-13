import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	Input,
	Button,
	useToast,
	Stack,
} from '@chakra-ui/react';
import React, { type ChangeEvent, useReducer } from 'react';
import { api } from '~/utils/api';
import {
	InputAddressReducer,
	initialState,
} from '~/reducer/InputAddressReducer';

type UserAddressesFormModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const UserAddressesFormModal = ({
	isOpen,
	onClose,
}: UserAddressesFormModalProps) => {
	const { mutate: createByUser, isLoading } =
		api.addresses.createByUser.useMutation();
	const [input, dispatch] = useReducer(InputAddressReducer, initialState);
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
		createByUser(
			{
				firstName: input.firstName,
				lastName: input.lastName,
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
		<Modal isOpen={isOpen} onClose={onClose}>
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
										value={value}
										name={name}
										onChange={(e) => handlInput(e)}
									/>
								</React.Fragment>
							))}
						</Stack>
					</ModalBody>
					<ModalFooter gap={5}>
						<Button isLoading={isLoading} type="submit">
							Сохранить
						</Button>
						<Button onClick={onClose}>Oтмена</Button>
					</ModalFooter>
				</FormControl>
			</ModalContent>
		</Modal>
	);
};

export default UserAddressesFormModal;
