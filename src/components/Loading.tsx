import { Skeleton } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type LoadingProps = {
	isLoaded: boolean;
	children: ReactNode;
};

const Loading = ({ children, isLoaded }: LoadingProps) => {
	return (
		<Skeleton isLoaded={isLoaded} rounded="2xl">
			{children}
		</Skeleton>
	);
};

export default Loading;
