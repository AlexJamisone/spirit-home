import { Box } from '@chakra-ui/react';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
import Dropzone from 'react-dropzone';
import { updateDrop } from '~/utils/uploadImage';

const DragDrop = () => {
	const handleFileSelect = useCallback(async (acceptedFiles: File[]) => {
		const hi = await updateDrop(acceptedFiles);
		console.log(hi);
	}, []);

	return (
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		<Dropzone onDrop={handleFileSelect}>
			{({ getRootProps, getInputProps }) => (
				<div {...getRootProps()}>
					<input {...getInputProps()} />
					<p>Drag and drop files here, or click to select files</p>
				</div>
			)}
		</Dropzone>
	);
};

export default DragDrop;
