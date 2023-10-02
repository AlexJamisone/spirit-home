import { Button, Input, Stack } from '@chakra-ui/react';
import { useCreateProductContext } from '~/context/createProductContext';
import SizeCard from './SizeCard';

const Size = () => {
	const { size, edit, dispatch, form } = useCreateProductContext();
	return (
		<Stack direction="row" flexWrap="wrap" justifyContent="center">
			{edit ? (
				<>
					{form.quantity.map(({ id, quantity, name, sizeId }) => (
						<Stack key={id} w="60px">
							<Button>{name}</Button>
							<Input
								value={quantity}
								onChange={(e) =>
									dispatch({
										type: 'UPDATE_QT',
										payload: {
											id,
											quantity: +e.target.value,
											name,
											sizeId,
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
