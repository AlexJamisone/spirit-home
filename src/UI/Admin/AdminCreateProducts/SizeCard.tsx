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
							type: 'ADD_QT',
							payload: {
								id: '',
								quantity: 0,
								name: size.size,
								sizeId: size.id,
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
							type: 'UPDATE_QT',
							payload: {
								id: '',
								quantity: +e.target.value,
								name: size.size,
								sizeId: size.id,
							},
						})
					}
				/>
			) : null}
		</Stack>
	);
};

export default SizeCard;
