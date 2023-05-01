import { AbsoluteCenter, Box, Icon, Stack, Text } from '@chakra-ui/react';
import { useCallback } from 'react';
import Dropzone from 'react-dropzone';
import { MdOutlinePhotoLibrary } from 'react-icons/md';
import { useCreateProductContext } from '~/context/createProductContext';
import { update, upload } from '~/utils/uploadImage';

const DragDrop = () => {
	const { edit, dispatch, form } = useCreateProductContext();
	const handleFileSelect = useCallback(async (acceptedFiles: File[]) => {
		if (edit) {
			const updateImg = await update(
				acceptedFiles,
				form.image.map((item) => item.path)
			);
			dispatch({ type: 'SET_IMG', payload: updateImg });
		} else {
			const uploadImg = await upload(acceptedFiles);
			dispatch({ type: 'SET_IMG', payload: uploadImg });
		}
	}, []);

	return (
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		<Dropzone onDrop={handleFileSelect}>
			{({ getRootProps, getInputProps }) => (
				<Box
					{...getRootProps()}
					w={['100%']}
					h={['150px']}
					border="1px dashed #CBD5E0"
					cursor="pointer"
					position="relative"
				>
					<input {...getInputProps()} />
					<AbsoluteCenter>
						<Stack direction="column" alignItems="center">
							<Icon
								as={MdOutlinePhotoLibrary}
								color="#CBD5E0"
								boxSize={16}
							/>
							<Text
								textAlign="center"
								fontSize={12}
								fontWeight={600}
								textColor="#CBD5E0"
							>
								Перенеси сюда фотографии или кликни что бы
								добавить
							</Text>
						</Stack>
					</AbsoluteCenter>
				</Box>
			)}
		</Dropzone>
	);
};

export default DragDrop;