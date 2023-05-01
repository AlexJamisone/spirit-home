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
	Spinner,
	Stack,
	Tag,
	useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { api } from '~/utils/api';
type AdminProductSizeProps = {
	isOpen: boolean;
	onClose: () => void;
};

const AdminProductSize = ({ isOpen, onClose }: AdminProductSizeProps) => {
	const {
		mutate: create,
		isError,
		error,
		reset,
		isLoading: loadingCreate,
	} = api.size.create.useMutation();
	const { data: size, isLoading } = api.size.get.useQuery();
	const ctx = api.useContext();
	const toast = useToast();
	const [title, setTitle] = useState('');
	if (isLoading) return <Spinner />;
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			motionPreset="slideInBottom"
			size={['xs', 'md']}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader textAlign="center">Новый размер</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Stack>
						<FormControl isInvalid={isError}>
							<Input
								errorBorderColor="red.300"
								type="text"
								placeholder="Назови размер"
								onChange={(e) => {
									reset();
									setTitle(e.target.value);
								}}
								isDisabled={loadingCreate}
								value={title}
							/>
							<FormErrorMessage
								fontWeight={600}
								textColor="red.300"
							>
								{error?.data?.zodError?.fieldErrors.size}
							</FormErrorMessage>
						</FormControl>
						<Stack direction="row" justifyContent="center">
							{size?.length &&
								size
									.sort((a, b) =>
										a.title.localeCompare(
											b.title,
											undefined,
											{ numeric: true }
										)
									)
									.map(({ title, id }) => (
										<Stack key={id}>
											<Tag variant="solid">{title}</Tag>
										</Stack>
									))}
						</Stack>
					</Stack>
				</ModalBody>
				<ModalFooter gap={3}>
					<Button
						isLoading={loadingCreate}
						colorScheme="telegram"
						onClick={() =>
							create(
								{ size: title },
								{
									onSuccess: () => {
										toast({
											description: `Размер ${title} успешно создан`,
											status: 'info',
											isClosable: true,
											duration: 3000,
										});
										setTitle('');
										void ctx.size.invalidate();
									},
								}
							)
						}
					>
						Добавить
					</Button>
					<Button colorScheme="red" onClick={() => onClose()}>
						Отмена
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AdminProductSize;
