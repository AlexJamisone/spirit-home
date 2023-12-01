import { Image } from '@chakra-ui/next-js';
import { Icon, IconButton, Stack, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { TiDeleteOutline } from 'react-icons/ti';
import { env } from '~/env.mjs';
import { useCreateProduct } from '~/stores/useCreateProduct';
import { api } from '~/utils/api';

const AdminCreateImages = () => {
	const { image, removeImag } = useCreateProduct();
	const { mutate: deletImage } = api.products.deletImage.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const handlDeletImage = (id: string) => {
		deletImage(
			{ id },
			{
				onSuccess: () => {
					void ctx.products.invalidate();
					toast({
						description: 'Картинка успешно удалена',
						status: 'loading',
						isClosable: true,
					});
					removeImag(id);
				},
				onError: ({ message }) => {
					toast({
						description: message,
						status: 'error',
						isClosable: true,
					});
				},
			}
		);
	};
	return (
		<>
			{image.length !== 0 && (
				<Stack
					direction="row"
					flexWrap="wrap"
					gap={5}
					justifyContent="center"
				>
					{image.map((src, index) => (
						<Stack
							key={index}
							position="relative"
							as={motion.div}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						>
							<IconButton
								variant="ghost"
								as={motion.button}
								initial={{
									opacity: 0,
									rotate: 180,
								}}
								animate={{
									opacity: 1,
									rotate: 0,
								}}
								position="absolute"
								right={-5}
								top={-2}
								size="sm"
								aria-label="deletImg"
								icon={
									<Icon
										as={TiDeleteOutline}
										color="red.500"
										boxSize={7}
									/>
								}
								onClick={() => handlDeletImage(src)}
							/>
							<Image
								transitionDuration="0.5s"
								objectFit="cover"
								src={env.NEXT_PUBLIC_UPLOADTHING_URL + src}
								alt={`product${src}`}
								width={200}
								height={200}
								quality={100}
							/>
						</Stack>
					))}
				</Stack>
			)}
		</>
	);
};

export default AdminCreateImages;
