import { Icon, IconButton, Spinner, useToast } from '@chakra-ui/react';
import type { IconType } from 'react-icons';
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi';
import Overlay from '~/components/NoData/Overlay';
import { api } from '~/utils/api';

const ProductAction = ({ archived, id }: { archived: boolean; id: string }) => {
	const { mutate: archivedProduct, isLoading } =
		api.products.archived.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const handlArchiveButton = (icon: IconType) => {
		return (
			<IconButton
				icon={<Icon as={icon} color="cyan.600" />}
				aria-label="deletButton"
				size="sm"
				position="absolute"
				top={5}
				right={5}
				zIndex={20}
				onClick={(e) => {
					archivedProduct(
						{
							id,
							action: !archived,
						},
						{
							onSuccess: () => {
								toast({
									description: archived
										? `Товар успешно архивирован!🚀`
										: `Товар успешно восстоновлен!🎉`,
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
				}}
			/>
		);
	};
	return (
		<>
			{isLoading ? (
				<>
					<Overlay />
					<Spinner
						position="absolute"
						top={'50%'}
						zIndex={20}
						size="xl"
						cursor="not-allowed"
					/>
				</>
			) : null}
			{archived ? (
				<>
					<Overlay />
				</>
			) : null}

			{archived
				? handlArchiveButton(BiArchiveOut)
				: handlArchiveButton(BiArchiveIn)}
		</>
	);
};

export default ProductAction;
