import { Stack } from '@chakra-ui/react';
import Sun from '~/assets/Sun';
import MainTitle from '../MainTitle/MainTitle';

const MainSection = () => {
	return (
		<Stack direction="row" overflow="hidden" justifyContent="space-between">
			<Sun ml="-500px" initialPositionX={-500} />
			<MainTitle />
			<Sun mr={'-500px'} initialPositionX={500} />
		</Stack>
	);
};

export default MainSection;
