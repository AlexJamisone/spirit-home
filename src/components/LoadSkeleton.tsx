import { Skeleton, SkeletonProps, Stack, StackProps } from '@chakra-ui/react';

type LoadSkeletonProps = {
	styleSkeleton?: SkeletonProps;
	styleStack?: StackProps;
	quantity: number;
};
const LoadSkeleton = ({
	styleSkeleton,
	quantity,
	styleStack,
}: LoadSkeletonProps) => {
	const placeholders = new Array(quantity)
		.fill(0)
		.map((_, index) => index + 1);
	return (
		<Stack gap={3} {...styleStack}>
			{placeholders.map((_, index) => (
				<Skeleton key={index} {...styleSkeleton} />
			))}
		</Stack>
	);
};
export default LoadSkeleton;
