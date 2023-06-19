import { Icon, IconButton, Image, Spinner, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { TiDeleteOutline } from 'react-icons/ti';
import { useCreateProductContext } from '~/context/createProductContext';

const AdminCreateProductsImages = () => {
	const { form, handlDeletImage } = useCreateProductContext();
	return (
		<>
			{form.image.length === 0 ? null : (
				<Stack
					direction="row"
					flexWrap="wrap"
					gap={5}
					justifyContent="center"
				>
					{form.image.map((src, index) => (
						<Stack key={index} position="relative">
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
									transition: {
										type: 'just',
										duration: 0.5,
										delay: 1,
									},
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
								onClick={() => handlDeletImage(src, index)}
							/>
							<Image
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transitionDuration="0.5s"
								as={motion.img}
								objectFit="cover"
								fallback={<Spinner />}
								src={`${
									process.env
										.NEXT_PUBLIC_SUPABASE_URL as string
								}/storage/v1/object/public/products/${
									src.path
								}`}
								alt="product"
								width={200}
								height={200}
							/>
						</Stack>
					))}
				</Stack>
			)}
		</>
	);
};

export default AdminCreateProductsImages;
