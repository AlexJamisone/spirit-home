import { Skeleton, SkeletonProps, Stack, StackProps } from '@chakra-ui/react';
type PlaceholdersProp = {
	quantity: number;
	container?: StackProps;
	placeholder?: SkeletonProps;
};

const Placeholdes = ({
	quantity,
	container,
	placeholder,
}: PlaceholdersProp) => {
	const placeholders = new Array(quantity)
		.fill(0)
		.map((_, index) => index + 1);
	return (
		<Stack {...container} direction="row" gap={10} justifyContent="center">
			{placeholders.map((id) => (
				<Skeleton
					{...placeholder}
					key={id}
					w={292}
					h={450}
					rounded="3xl"
				/>
			))}
		</Stack>
	);
};

export default Placeholdes;
