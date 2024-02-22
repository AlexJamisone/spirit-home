import { Stack } from '@chakra-ui/react';
import Image from 'next/image';
import MainTitle from '../MainTitle/MainTitle';

const MainSection = () => {
	return (
		<Stack width="100%" height="640px" position="relative" mt="-120px">
			<Image
				style={{
					position: 'absolute',
				}}
				src="/assets/background.png"
				alt="main"
				quality={100}
				fill
			/>
			<MainTitle />
		</Stack>
	);
};

export default MainSection;
