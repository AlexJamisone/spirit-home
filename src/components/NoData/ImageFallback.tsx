import { Skeleton } from '@chakra-ui/react';

const ImageFallback = ({
	isSlider,
	width,
}: {
	isSlider?: boolean;
	width?: string;
	height?: string;
}) => {
	return (
		<Skeleton
			w={isSlider ? '300px' || width : width ?? 100}
			h={isSlider ? '405px' || width : width ?? 100}
			flex={isSlider ? '0 0 100%' : undefined}
		/>
	);
};

export default ImageFallback;
