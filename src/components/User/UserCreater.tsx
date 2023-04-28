import {
	Checkbox,
	Icon,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import { useNewOrderContext } from '~/context/orderContext';

const UserCreater = () => {
	const { input, dispatch, isSignedIn } = useNewOrderContext();
	const [show, setShow] = useState(false);
	return (
		<Stack>
			{isSignedIn ? null : (
				<>
					<Checkbox
						w="150px"
						isChecked={input.saveAcc}
						onChange={() =>
							dispatch({
								type: 'SET_SAVE_ACC',
								payload: !input.saveAcc,
							})
						}
					>
						Создать аккаунт?
					</Checkbox>
					{input.saveAcc ? (
						<Stack>
							<Input
								id="email"
								type="email"
								placeholder="Ваш email"
								value={input.email}
								onChange={(e) =>
									dispatch({
										type: 'SET_EMAIL',
										payload: e.target.value,
									})
								}
							/>
							<InputGroup>
								<Input
									id="password"
									type={show ? 'text' : 'password'}
									placeholder="Ваш пароль"
									value={input.password}
									onChange={(e) =>
										dispatch({
											type: 'SET_PASSWORD',
											payload: e.target.value,
										})
									}
								/>
								<InputRightElement>
									<IconButton
										variant="ghost"
										aria-label="password"
										onClick={() => setShow(!show)}
										icon={
											<Icon
												as={show ? BiShow : BiHide}
												boxSize={6}
												color="gray.500"
											/>
										}
									/>
								</InputRightElement>
							</InputGroup>
							<Checkbox
								w="155px"
								isChecked={input.saveAddress}
								onChange={() =>
									dispatch({
										type: 'SET_SAVE_ADDRESS',
										payload: !input.saveAddress,
									})
								}
							>
								Сохранить адрес?
							</Checkbox>
						</Stack>
					) : null}
				</>
			)}
		</Stack>
	);
};

export default UserCreater;
