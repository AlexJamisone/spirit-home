import { Button, useToast } from '@chakra-ui/react';
import { useAccordion } from '~/stores/useAccordion';
import { api } from '~/utils/api';

type ActionProps = {
	onClose: () => void;
};

export const Action = ({ onClose }: ActionProps) => {
	const { mutate: create, isLoading: loadingCreate } =
		api.accordions.create.useMutation();
	const { mutate: update, isLoading: loadingUpdate } =
		api.accordions.update.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const edit = useAccordion((state) => state.isEdit.edit);
	const id = useAccordion((state) => state.isEdit.id);
	const content = useAccordion((state) => state.input.content);
	const title = useAccordion((state) => state.input.title);
	const setClear = useAccordion((state) => state.setClear);
	const setError = useAccordion((state) => state.setError);
	const handlAction = () => {
		if (edit) {
			update(
				{
					content: content.split(/\n/g),
					id,
					title,
				},
				{
					onSuccess: () => {
						void ctx.accordions.invalidate();
						toast({
							description: `Вопрос - ответ успешно обновлён 😊`,
							status: 'info',
							isClosable: true,
						});
						setClear();
						onClose();
					},
					onError: ({ data, message }) => {
						if (data?.zodError?.fieldErrors) {
							setError(true, data.zodError.fieldErrors);
						} else {
							toast({
								description: message,
								status: 'error',
								isClosable: true,
							});
						}
					},
				}
			);
		} else {
			create(
				{
					content: content.split(/\n/g),
					title,
				},
				{
					onSuccess: () => {
						void ctx.accordions.invalidate();
						toast({
							description: 'Вопрос - ответ успешно создан 😎',
							status: 'success',
							isClosable: true,
						});
						setClear();
						onClose();
					},
					onError: ({ data, message }) => {
						const inputError = data?.zodError?.fieldErrors;
						if (inputError) {
							setError(true, inputError);
						} else {
							toast({
								description: message,
								status: 'error',
								isClosable: true,
							});
						}
					},
				}
			);
		}
	};
	return (
		<>
			<Button
				isLoading={loadingCreate || loadingUpdate}
				onClick={handlAction}
			>
				{edit ? 'Обновить' : 'Создать'}
			</Button>
			<Button onClick={onClose}>Отмена</Button>
		</>
	);
};
