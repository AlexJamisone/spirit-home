import { Image } from '@chakra-ui/next-js';
import { Icon, IconButton, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { TiDeleteOutline } from 'react-icons/ti';
import { useCreateProductContext } from '~/context/createProductContext';
import { env } from '~/env.mjs';

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
								onClick={() => handlDeletImage(src, index)}
							/>
							<Image
								transitionDuration="0.5s"
								objectFit="cover"
								src={`${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${src.path}`}
								alt="product"
								width={200}
								height={200}
								quality={100}
								// placeholder={'blur'}
								// blurDataURL={undefined}
							/>
						</Stack>
					))}
				</Stack>
			)}
		</>
	);
};

export default AdminCreateProductsImages;
