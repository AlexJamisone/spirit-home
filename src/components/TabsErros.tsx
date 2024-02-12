import { Text } from '@chakra-ui/react';
import { useDiscount } from '~/stores/useDiscount';

const TabsErros = () => {
	const err = useDiscount((state) => state.error?.error);
	const isError = useDiscount((state) => state.error?.isError);
	return (
		<>
			{isError && err?.['path'] && (
				<Text
					fontSize={12}
					maxW={250}
					textAlign="center"
					textColor="red.400"
					fontWeight={600}
				>
					{err?.['path'][0]}
				</Text>
			)}
		</>
	);
};
export default TabsErros;
