import {
	Box,
	Button,
	Icon,
	IconButton,
	Image,
	Spinner,
	Stack,
	Tag,
	Text,
	useToast,
} from '@chakra-ui/react';
import type { Product, ProductPriceHistory, Role } from '@prisma/client';
import type { SyntheticEvent } from 'react';
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi';
import { useCart } from '~/context/cartContext';
import { api } from '~/utils/api';

type ProductsCardProps = {
	product: Product & {
		priceHistory: ProductPriceHistory[];
	};
	handlEdit?: (
		product: Product & { priceHistory: ProductPriceHistory[] }
	) => void;
	isLoading?: boolean;
	admin?: Role;
};
const ProductsCard = ({ product, handlEdit, admin }: ProductsCardProps) => {
	const {
		description,
		name,
		image,
		id,
		categoryTitle,
		quantity,
		priceHistory,
		archived,
	} = product;
	const toast = useToast();

	const { mutate: archivedProduct, isLoading } =
		api.products.archived.useMutation();
	const ctx = api.useContext();

	const { cartDispatch } = useCart();

	const handlAddToCart = (e: SyntheticEvent) => {
		cartDispatch({ type: 'ADD_TO_CART', payload: product });
		e.stopPropagation();
	};

	const handleArchivedProduct = (
		id: string,
		name: string,
		e: SyntheticEvent
	) => {
		archivedProduct(
			{
				id,
				action: !archived,
			},
			{
				onSuccess: () => {
					toast({
						description: archived
							? `Товар ${name} успешно архивирован!🚀`
							: `Товар ${name} успешно восстоновлен!🎉`,
						status: archived ? 'info' : 'success',
						isClosable: true,
					});
					void ctx.products.invalidate();
				},
				onError: () => {
					toast({
						description: `Ошбка с удалением ❌`,
						status: 'error',
						isClosable: true,
					});
				},
			}
		);
		e.stopPropagation();
	};
	return (
		<Stack
			maxW={['300px']}
			h={['350px']}
			direction="column"
			justifyContent="center"
			alignItems="center"
			p={5}
			border="1px solid #CBD5E0"
			rounded="3xl"
			boxShadow="2xl"
			_hover={{
				transform: `${archived ? 'none' : 'scale(1.1)'}`,
			}}
			cursor="pointer"
			transition="all 0.2s ease-in-out"
			position="relative"
			zIndex={-0}
			onClick={() =>
				admin === undefined || admin === 'USER'
					? null
					: archived
					? null
					: handlEdit?.(product)
			}
		>
			{isLoading ? (
				<>
					<Box
						position="absolute"
						w="100%"
						height="100%"
						top={0}
						left={0}
						zIndex={20}
						bgColor="whiteAlpha.600"
						rounded="3xl"
					></Box>
					<Spinner position="absolute" zIndex={20} size="xl" />
				</>
			) : null}
			{archived ? (
				<>
					<Box
						position="absolute"
						cursor="not-allowed"
						w="100%"
						height="100%"
						top={0}
						left={0}
						zIndex={10}
						bgColor="whiteAlpha.600"
						rounded="3xl"
					></Box>
				</>
			) : null}
			<Stack
				direction={['row']}
				position="relative"
				justifyContent="center"
				w="100%"
			>
				<Image
					src={`${
						process.env.NEXT_PUBLIC_SUPABASE_URL as string
					}/storage/v1/object/public/products/${image[0] as string}`}
					alt={name}
					objectFit="cover"
					width={100}
					height={100}
				/>
				{admin === undefined || admin === 'USER' ? null : (
					<>
						{archived ? (
							<IconButton
								icon={
									<Icon as={BiArchiveOut} color="cyan.600" />
								}
								aria-label="deletButton"
								size="md"
								position="absolute"
								top={0}
								right={0}
								zIndex={20}
								onClick={(e) =>
									handleArchivedProduct?.(id, name, e)
								}
							/>
						) : (
							<IconButton
								icon={
									<Icon as={BiArchiveIn} color="cyan.600" />
								}
								aria-label="deletButton"
								size="md"
								position="absolute"
								top={0}
								right={0}
								zIndex={10}
								onClick={(e) =>
									handleArchivedProduct?.(id, name, e)
								}
							/>
						)}
					</>
				)}
			</Stack>
			<Stack fontSize={16} textAlign="center">
				<Text>{name}</Text>
				<Text
					fontSize={12}
					textColor={'gray.500'}
					maxH="100px"
					borderBottom="none"
					boxShadow="inset 0 -10px 10px -10px rgba(0, 0, 0, 0.5);"
					rounded="md"
					opacity="0.5"
					overflow="hidden"
				>
					{description}
				</Text>
			</Stack>
			{admin === undefined || admin === 'USER' ? null : (
				<Tag>{categoryTitle}</Tag>
			)}
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				gap={16}
			>
				{admin === undefined || admin === 'USER' ? (
					<Button onClick={(e) => handlAddToCart(e)}>
						В корзину
					</Button>
				) : (
					<Text>{`${quantity} шт`}</Text>
				)}
				<Text>{`${priceHistory[0]?.price ?? 0} ₽`}</Text>
			</Stack>
		</Stack>
	);
};

export default ProductsCard;
