import { Box } from '@chakra-ui/react';
type CounterProps = {
	length: number;
};
const Counter = ({ length }: CounterProps) => {
	return (
		<Box
			bgColor={'whiteAlpha.900'}
			width={'25px'}
			height={'25px'}
			rounded={'2xl'}
			position={'absolute'}
			bottom={'-10px'}
			right={'-10px'}
			cursor={'pointer'}
			opacity={length > 0 ? 1 : 0}
			transition={'opacity .2s ease-in-out'}
			fontWeight={600}
			textAlign={'center'}
			lineHeight={1.5}
			fontSize={'16px'}
			pointerEvents="none"
			zIndex={2}
		>
			{length}
		</Box>
	);
};

export default Counter;
