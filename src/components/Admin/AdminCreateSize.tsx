import {
	Button,
	FormControl,
	FormErrorMessage,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Tag,
	useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { api } from '~/utils/api';

type AdminCreateSizeProps = {
	isOpen: boolean;
	onClose: () => void;
};
const AdminCreateSize = ({ isOpen, onClose }: AdminCreateSizeProps) => {
	const [value, setValue] = useState('');
	const { data: size } = api.size.get.useQuery();
	const {
		mutate: create,
		isLoading,
		isError,
		error,
		reset,
	} = api.size.create.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	if (!size) return null;
	console.log();
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			motionPreset="slideInBottom"
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader textAlign="center">Новый размер</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Stack gap={5}>
						<FormControl isInvalid={isError}>
							<Input
								errorBorderColor="red.300"
								placeholder="Укажи новый размер"
								isDisabled={isLoading}
								type="text"
								onChange={(e) => {
									reset();
									setValue(e.target.value);
								}}
								value={value}
							/>
							<FormErrorMessage
								textColor="red.300"
								fontWeight={600}
							>
								{error?.data?.zodError?.fieldErrors.size?.[0]}
							</FormErrorMessage>
						</FormControl>
						<Stack direction="row" justifyContent="center">
							{size
								.sort((a, b) =>
									a.size.localeCompare(b.size, undefined, {
										numeric: true,
									})
								)
								.map(({ id, size }) => (
									<Tag cursor="pointer" key={id}>
										{size}
									</Tag>
								))}
						</Stack>
					</Stack>
				</ModalBody>
				<ModalFooter gap={5}>
					<Button
						colorScheme="telegram"
						isLoading={isLoading}
						onClick={() =>
							create(
								{ size: value },
								{
									onSuccess: () => {
										toast({
											description: `Размер '${value}' успешно создан`,
											status: 'info',
											isClosable: true,
										});
										void ctx.size.invalidate();
										setValue('');
									},
									onError: ({ message }) => {
										if (
											message ===
											'Данный размер уже существует'
										) {
											toast({
												description: `${message}`,
												status: 'error',
											});
										}
									},
								}
							)
						}
					>
						Сохранить
					</Button>
					<Button colorScheme="red" onClick={onClose}>
						Отмена
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AdminCreateSize;
