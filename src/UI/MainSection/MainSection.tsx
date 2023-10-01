import { Stack } from '@chakra-ui/react';
import Sun from '~/assets/Sun';
import MainTitle from '../MainTitle/MainTitle';

const MainSection = () => {
	return (
		<Stack direction="row" overflow="hidden" justifyContent="space-between">
			<Sun
				containerProps={{
					ml: '-500px',
					initial: {
						x: -500,
					},
					animate: {
						x: 0,
						rotate: 360,
						transition: {
							type: 'spring',
							duration: 4,
						},
					},
				}}
			/>
			<MainTitle />
			<Sun
				containerProps={{
					mr: '-500px',
					initial: {
						x: 500,
					},
					animate: {
						x: 0,
						rotate: 360,
						transition: {
							type: 'spring',
							duration: 4,
						},
					},
				}}
			/>
		</Stack>
	);
};

export default MainSection;
