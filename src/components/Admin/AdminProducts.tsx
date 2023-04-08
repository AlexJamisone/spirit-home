import {
	Button,
	Icon,
	Stack,
	Text,
	useDisclosure,
	Tag,
} from '@chakra-ui/react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import AdminProductsModal from './AdminProductsModal';
import { api } from '~/utils/api';
import Image from 'next/image';

const AdminProducts = () => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const { data: products } = api.products.get.useQuery();
	if (!products) return null;
	return (
		<Stack direction="row" alignItems="center" gap={3}>
			<Button
				h="150px"
				variant="outline"
				rightIcon={<Icon as={IoIosAddCircleOutline} boxSize={8} />}
				onClick={() => onToggle()}
			>
				Добавить новый товар
			</Button>
			{products.length === 0 ? (
				<Text>Пока что нету Товаров</Text>
			) : (
				products.map(
					({
						id,
						image,
						name,
						categoryTitle,
						description,
						price,
						quantity,
					}) => (
						<Stack
							key={id}
							w={['200px']}
							direction="column"
							justifyContent="center"
						>
							<Image
								src={`${
									process.env
										.NEXT_PUBLIC_SUPABASE_URL as string
								}/storage/v1/object/public/products/${
									image as string
								}`}
								alt={name}
								width={100}
								height={100}
							/>
							<Text>{name}</Text>
							<Text>{description}</Text>
							<Tag>{categoryTitle}</Tag>
							<Stack dir="row">
								<Text>{`${price} ₽`}</Text>
								<Text>{`${quantity}, шт`}</Text>
							</Stack>
						</Stack>
					)
				)
			)}
			<AdminProductsModal isOpen={isOpen} onClose={onClose} />
		</Stack>
	);
};

export default AdminProducts;
