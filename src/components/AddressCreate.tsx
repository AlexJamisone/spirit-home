import { Grid, GridItem, Input } from '@chakra-ui/react';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { inputFildsAddress } from '~/constants/inputFildsAddress';
import type { Action, InputAddressState } from '~/reducer/InputAddressReducer';
import type { Info } from './NewOrder';
import UserCreater from './User/UserCreater';

type AddressCreateProps = {
	input: InputAddressState;
	dispatch: Dispatch<Action>;
	info: Info;
	setInfo: Dispatch<SetStateAction<Info>>;
	isAuth?: boolean | undefined;
};
const AddressCreate = ({
	dispatch,
	input,
	info,
	setInfo,
	isAuth,
}: AddressCreateProps) => {
	const handlInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		switch (name) {
			case 'firstName':
				dispatch({ type: 'SET_NAME', payload: value });
				break;
			case 'lastName':
				dispatch({ type: 'SET_LAST_NAME', payload: value });
				break;
			case 'city':
				dispatch({ type: 'SET_CITY', payload: value });
				break;
			case 'phone':
				dispatch({ type: 'SET_PHONE', payload: value });
				break;
			case 'cdek':
				dispatch({ type: 'SET_POINT', payload: value });
				break;
			default:
				break;
		}
	};
	return (
		<>
			<Grid
				gap={3}
				templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
			>
				{inputFildsAddress(input).map(
					({ name, placeholder, value }) => (
						<GridItem key={name}>
							<Input
								type="text"
								name={name}
								w={['300px']}
								placeholder={placeholder}
								value={value ?? ''}
								onChange={(e) => handlInput(e)}
							/>
						</GridItem>
					)
				)}
			</Grid>
			<UserCreater info={info} setInfo={setInfo} isAuth={isAuth} />
		</>
	);
};

export default AddressCreate;
