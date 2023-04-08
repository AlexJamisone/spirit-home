/* eslint-disable @typescript-eslint/no-misused-promises */
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Input,
} from '@chakra-ui/react';
import Image from 'next/image';
import { type ChangeEvent, useState } from 'react';
import { supabase } from '~/utils/supabase';

type AdminProductsModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const AdminProductsModal = ({ isOpen, onClose }: AdminProductsModalProps) => {
	const [form, setForm] = useState({
		name: '',
		description: '',
		price: 0,
		image: '',
		category: '',
		quantity: 0,
	});
	const handlUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
		let file: File | undefined;
		if (e.target.files) {
			file = e.target.files[0];
		}
		if (!file) return null;
		const { data, error } = await supabase.storage
			.from('products')
			.upload(`public/${file.name}`, file);
        console.log(data)
        if(!data) return null
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Создать новый товар</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{form.image !== '' ? (
						<Image
							src={`${
								process.env.NEXT_PUBLIC_SUPABASE_URL as string
							}/storage/v1/object/public/products/${form.image}`}
							alt="product"
							width={200}
							height={200}
						/>
					) : null}
					<Input type="file" onChange={(e) => handlUploadImage(e)} />
				</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AdminProductsModal;
