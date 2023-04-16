import { Box, Text } from '@chakra-ui/react';
import { type Dispatch, useCallback } from 'react';
import Dropzone from 'react-dropzone';
import type { Action, FormProductState } from '~/reducer/FormReducer';
import { update, upload } from '~/utils/uploadImage';

type DragDropProps = {
	dispatch: Dispatch<Action>;
	edit: boolean;
	form: FormProductState;
};

const DragDrop = ({ dispatch, edit, form }: DragDropProps) => {
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
				<Box {...getRootProps()}>
					<input {...getInputProps()} />
					<Text>
						Drag and drop files here, or click to select files
					</Text>
				</Box>
			)}
		</Dropzone>
	);
};

export default DragDrop;
