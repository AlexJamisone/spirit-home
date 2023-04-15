import { Box, Text } from '@chakra-ui/react';
import { type Dispatch, useCallback } from 'react';
import Dropzone from 'react-dropzone';
import type { Action } from '~/reducer/FormReducer';
import { uploadDrop } from '~/utils/uploadImage';

type DragDropProps = {
	dispatch: Dispatch<Action>;
};

const DragDrop = ({ dispatch }: DragDropProps) => {
	const handleFileSelect = useCallback(async (acceptedFiles: File[]) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		const upload = await uploadDrop(acceptedFiles);
		dispatch({type: "SET_IMG", payload: upload})
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
