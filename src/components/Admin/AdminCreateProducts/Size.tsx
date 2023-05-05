import { Button, Input, Stack } from '@chakra-ui/react';
import { useCreateProductContext } from '~/context/createProductContext';
import SizeCard from './SizeCard';

const Size = () => {
	const { size, edit, dispatch, form } = useCreateProductContext();
	return (
		<Stack direction="row">
			{edit ? (
				<>
					{form.size.map(({ id, quantity, name }) => (
						<Stack key={id} w="60px">
							<Button>{name}</Button>
							<Input
								value={quantity}
								onChange={(e) =>
									dispatch({
										type: 'UPDATE_SIZE',
										payload: {
											id,
											quantity: +e.target.value,
											name,
										},
									})
								}
							/>
						</Stack>
					))}
				</>
			) : (
				size?.map((size) => <SizeCard size={size} key={size.id} />)
			)}
		</Stack>
	);
};

export default Size;
