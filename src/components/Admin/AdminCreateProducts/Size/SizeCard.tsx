import { Button, Input, Stack } from '@chakra-ui/react';
import type { Size } from '@prisma/client';
import { useState, type ChangeEvent } from 'react';
import { useCreateProductContext } from '~/context/createProductContext';

type SizeCardProps = {
	size: Size;
};

const SizeCard = ({ size }: SizeCardProps) => {
	const { form, dispatch } = useCreateProductContext();
	const { title,  id, createdAt, updateAt } = size;
	const [edit, setEdit] = useState(false);
	const handlChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		dispatch({
			type: 'SET_SIZE',
			payload: {
				id,
				quantity: parseInt(value),
				createdAt,
				title,
				updateAt,
			},
		});
	};
	console.log(form.size);
	return (
		<Stack direction="column" w="100px" justifyContent="center">
			<Button onClick={() => setEdit(!edit)} isActive={edit}>
				{title}
			</Button>
			{edit ? (
				<Input
					type="number"
					name="size"
					onChange={(e) => handlChange(e)}
				/>
			) : null}
		</Stack>
	);
};

export default SizeCard;
