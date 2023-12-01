import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import '@uploadthing/react/styles.css';
import { useCreateProduct } from '~/stores/useCreateProduct';
import { UploadDropzone } from '~/utils/uploadthings';

const DragDrop = () => {
	const { error, reset, setImage } = useCreateProduct();
	const imgError = error?.isError && error?.msg?.image !== undefined;
	return (
		<FormControl
			isInvalid={imgError}
			border={imgError ? '2px dashed' : undefined}
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
					res.map(({ key }) => setImage(key));
				}}
			/>
			<FormErrorMessage position="absolute" fontWeight={600}>
				{error?.msg?.image}
			</FormErrorMessage>
		</FormControl>
	);
};

export default DragDrop;
