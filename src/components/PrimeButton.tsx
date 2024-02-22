import { Button } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

type PrimeButtonProps = {
	content: string;
	action?: MouseEventHandler<HTMLButtonElement>;
};
const PrimeButton = ({ content, action }: PrimeButtonProps) => {
	return <Button variant='btn'>{content}</Button>;
};
export default PrimeButton;
