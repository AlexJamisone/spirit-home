import { Button, Stack } from '@chakra-ui/react';

const DiscountAction = () => {
	const handlClick = () => {};
	return (
		<Stack>
			<Button variant="outline" w='100%' onClick={handlClick}>
				Создать
			</Button>
		</Stack>
	);
};
export default DiscountAction;
