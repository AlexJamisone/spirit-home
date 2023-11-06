import { Stack } from '@chakra-ui/react';
import Sun from '~/assets/Sun';
import MainTitle from '../MainTitle/MainTitle';

const MainSection = () => {
	return (
		<Stack
			direction="row"
			overflow="hidden"
			justifyContent="center"
			position="relative"
			gap={'750px'}
		>
			<Sun initialPositionX={-300} />
			<MainTitle />
			<Sun initialPositionX={300} />
		</Stack>
	);
};

export default MainSection;
