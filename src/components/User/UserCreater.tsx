import {
	Checkbox,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	Icon,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import { useNewOrderContext } from '~/context/orderContext';

const UserCreater = () => {
	const {
		input,
		dispatch,
		isSignedIn,
		isError,
		resetNoAddress,
		resetNoAuth,
		passwordLengthError,
	} = useNewOrderContext();
	const [show, setShow] = useState(false);
	return (
		<Stack w="300px">
			{isSignedIn ? null : (
				<>
					<Checkbox
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
						<FormControl
							isInvalid={isError}
							as={motion.div}
							initial={{ opacity: 0 }}
							animate={{
								opacity: 1,
								transition: {
									type: 'spring',
									duration: 0.6,
								},
							}}
							exit={{ opacity: 0 }}
						>
							<Stack w="300px">
								<Input
									errorBorderColor={
										passwordLengthError ===
										'Пароль должен быть минимум 8 символов'
											? 'green.300'
											: 'orange.300'
									}
									id="email"
									type="email"
									placeholder="Ваш email"
									value={input.email}
									onChange={(e) => {
										void resetNoAddress() || resetNoAuth();
										dispatch({
											type: 'SET_EMAIL',
											payload: e.target.value,
										});
									}}
								/>
								<InputGroup position="relative">
									<Input
										mb={5}
										id="password"
										errorBorderColor={
											passwordLengthError ===
											'Пароль должен быть минимум 8 символов'
												? 'red.300'
												: 'orange.300'
										}
										type={show ? 'text' : 'password'}
										placeholder="Ваш пароль"
										value={input.password}
										onChange={(e) => {
											void resetNoAddress() ||
												resetNoAuth();
											dispatch({
												type: 'SET_PASSWORD',
												payload: e.target.value,
											});
										}}
										required
									/>
									{isError &&
									passwordLengthError ===
										'Пароль должен быть минимум 8 символов' ? (
										<FormErrorMessage
											position="absolute"
											bottom={0}
										>
											{passwordLengthError}
										</FormErrorMessage>
									) : (
										<FormHelperText
											position="absolute"
											bottom={0}
										>
											Мининмум 8 символов
										</FormHelperText>
									)}
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
							</Stack>
						</FormControl>
					) : null}
				</>
			)}
		</Stack>
	);
};

export default UserCreater;
