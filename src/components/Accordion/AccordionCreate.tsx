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
	Textarea,
	useToast,
} from '@chakra-ui/react';
import { useAccordionContext } from '~/context/accardionsContext';
import { api } from '~/utils/api';

const AccordionCreate = () => {
	const {
		mutate: create,
		isLoading: loadingCreate,
		error,
		isError,
		reset,
	} = api.accordions.create.useMutation();
	const { mutate: update, isLoading: loadingUpdate } =
		api.accordions.update.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const { state, dispatch, isOpen, onClose } = useAccordionContext();
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader textAlign="center">
					{state.edit ? 'Обновить аккардион' : 'Новый аккордион'}
				</ModalHeader>
				<ModalCloseButton />
				<FormControl
					as={'form'}
					isInvalid={isError}
					onSubmit={(e) => {
						e.preventDefault();
						if (state.edit) {
							update(
								{
									id: state.id,
									content: state.content,
									title: state.title,
								},
								{
									onSuccess: () => {
										void ctx.accordions.invalidate();
										toast({
											description: `Аккардион ${state.title} успешно обновлён`,
											status: 'info',
											isClosable: true,
										});
										dispatch({ type: 'SET_CLEAR' });
										onClose();
									},
								}
							);
						} else {
							create(
								{
									content: state.content,
									title: state.title,
								},
								{
									onSuccess: () => {
										void ctx.accordions.invalidate();
										toast({
											description: `Аккардион '${state.title}' успешно создан! ✔`,
											status: 'success',
											isClosable: true,
										});
										dispatch({ type: 'SET_CLEAR' });
										onClose();
									},
								}
							);
						}
					}}
				>
					<ModalBody>
						<Stack>
							<Input
								isDisabled={loadingCreate || loadingUpdate}
								placeholder="Заголовок"
								value={state.title}
								onChange={(e) => {
									dispatch({
										type: 'SET_TITLE',
										payload: e.target.value,
									});
									reset();
								}}
								type="text"
							/>
							<FormErrorMessage>
								{error?.data?.zodError?.fieldErrors.title}
							</FormErrorMessage>
							<Textarea
								h="250px"
								placeholder="Контент Аккардиона"
								isDisabled={loadingCreate || loadingUpdate}
								value={state.content}
								onChange={(e) => {
									dispatch({
										type: 'SET_CONTENT',
										payload: e.target.value,
									});
									reset();
								}}
							/>
							<FormErrorMessage>
								{error?.data?.zodError?.fieldErrors.content}
							</FormErrorMessage>
						</Stack>
					</ModalBody>
					<ModalFooter gap={3}>
						<Button
							type="submit"
							isLoading={loadingCreate || loadingUpdate}
						>
							{state.edit ? 'Обновить' : 'Сохранить'}
						</Button>
						<Button
							onClick={() => {
								dispatch({ type: 'SET_CLEAR' });
								onClose();
							}}
						>
							Отмена
						</Button>
					</ModalFooter>
				</FormControl>
			</ModalContent>
		</Modal>
	);
};

export default AccordionCreate;
