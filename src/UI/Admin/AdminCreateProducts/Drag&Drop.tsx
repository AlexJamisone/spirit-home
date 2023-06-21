import '@uploadthing/react/styles.css';
import { useCreateProductContext } from '~/context/createProductContext';
import { UploadDropzone } from '~/utils/uploadthings';

const DragDrop = () => {
	const { dispatch, form } = useCreateProductContext();

	return (
		<UploadDropzone
			onUploadError={(e) => console.log(e)}
			endpoint="imageUploader"
			onClientUploadComplete={(res) => {
				if (!res) throw new Error('Error with upload');
				const newImages = res.map(({ fileKey }) => fileKey);
				dispatch({
					type: 'SET_IMG',
					payload: [...form.image, ...newImages],
				});
			}}
		/>
	);
};

export default DragDrop;
