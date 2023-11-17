import { Skeleton, SkeletonText, Stack } from '@chakra-ui/react';

const ProductPlaceholder = () => {
	return (
		<Stack direction="row" gap={10}>
			<Stack>
				<Skeleton w={600} h={400} fadeDuration={1} />
				<Stack direction="row" justifyContent="center">
					<Skeleton w={100} h={90} />
					<Skeleton w={100} h={90} />
				</Stack>
			</Stack>
			<Stack w="300" alignItems="center">
				<Skeleton w={300} h={50} />
				<Stack w={300} direction="row" justifyContent="center">
					<Skeleton w="30px" h="30px" />
					<Skeleton w="30px" h="30px" />
					<Skeleton w="30px" h="30px" />
				</Stack>
				<SkeletonText w={300} noOfLines={17} />
			</Stack>
		</Stack>
	);
};

export default ProductPlaceholder;
