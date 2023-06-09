import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import '@uploadthing/react/styles.css';
import { useCreateProductContext } from '~/context/createProductContext';
import { UploadDropzone } from '~/utils/uploadthings';

const DragDrop = () => {
	const { dispatch, form, error, isError, reset } = useCreateProductContext();

	return (
		<FormControl
			isInvalid={isError && error?.image !== undefined}
			border={
				isError && error?.image !== undefined ? '2px dashed' : undefined
			}
			position="relative"
			rounded="2xl"
			borderColor="red.400"
			pt={0}
			mb={5}
		>
			<UploadDropzone
				onUploadError={(e) => console.log(e)}
				endpoint="imageUploader"
				onClientUploadComplete={(res) => {
					reset();
					if (!res) throw new Error('Error with upload');
					const newImages = res.map(({ fileKey }) => fileKey);
					dispatch({
						type: 'SET_IMG',
						payload: [...form.image, ...newImages],
					});
				}}
			/>
			<FormErrorMessage position="absolute" fontWeight={600}>
				{error?.image}
			</FormErrorMessage>
		</FormControl>
	);
};

export default DragDrop;
