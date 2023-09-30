import { Heading, Text } from '@chakra-ui/react';

const MainTitle = () => {
	return (
		<Heading
			textTransform="uppercase"
			lineHeight={1.5}
			fontSize={54}
			textAlign="center"
			w={[null, null, null, 780, null, 630]}
			textColor="second"
			fontWeight="thin"
		>
			The Sun is Up, The Sky is Blue, It`s so beautiful, and so are{' '}
			<Text
				as="span"
				textTransform="uppercase"
				position="relative"
				zIndex={20}
				_after={{
					content: `""`,
					display: 'inline-block',
					position: 'absolute',
					width: '120px',
					height: '60px',
					bgColor: 'brand',
					top: 0,
					right: '-5%',
					zIndex: -1,
					borderRadius: '83% 17% 69% 31% / 74% 70% 30% 26% ',
				}}
			>
				you
			</Text>
		</Heading>
	);
};
export default MainTitle;
