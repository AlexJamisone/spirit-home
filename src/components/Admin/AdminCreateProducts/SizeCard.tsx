import { Button, Input, Stack } from '@chakra-ui/react';
import type { Size } from '@prisma/client';
import { useState } from 'react';
import { useCreateProductContext } from '~/context/createProductContext';

type SizeCardProps = {
	size: Size;
};

const SizeCard = ({ size }: SizeCardProps) => {
	const [input, setInput] = useState(false);
	const { dispatch } = useCreateProductContext();
	return (
		<Stack w={'60px'}>
			<Button
				isActive={input}
				onClick={() => {
					if (input) {
						dispatch({
							type: 'REMOVE_SIZE',
							payload: size.id,
						});
						setInput(!input);
					} else {
						dispatch({
							type: 'ADD_SIZE',
							payload: {
								id: size.id,
								quantity: 0,
								name: size.size,
							},
						});
					}
					setInput(!input);
				}}
			>
				{size.size}
			</Button>
			{input ? (
				<Input
					onChange={(e) =>
						dispatch({
							type: 'UPDATE_SIZE',
							payload: {
								id: size.id,
								quantity: +e.target.value,
								name: size.size,
							},
						})
					}
				/>
			) : null}
		</Stack>
	);
};

export default SizeCard;
