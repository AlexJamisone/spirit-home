import { Stack } from '@chakra-ui/react';
import type { ReactNode } from 'react';

const ButtonsGroup = ({ children }: { children: ReactNode }) => {
	return <Stack position="relative">{children}</Stack>;
};

export default ButtonsGroup;
