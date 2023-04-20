import { Checkbox, Input, Stack } from '@chakra-ui/react';
import type { Dispatch, SetStateAction } from 'react';
import type { Info } from '../NewOrder';

type UserCreaterProps = {
	info: Info;
	setInfo: Dispatch<SetStateAction<Info>>;
};

const UserCreater = ({ info, setInfo }: UserCreaterProps) => {
	return (
		<Stack>
			<Checkbox
				isChecked={info.acc}
				onChange={() => setInfo({ ...info, acc: !info.acc })}
			>
				Создать аккаунт?
			</Checkbox>
			{info.acc ? (
				<Stack>
					<Input
						id="email"
						type="email"
						placeholder="Ваш email"
						value={info.email}
						onChange={(e) =>
							setInfo({ ...info, email: e.target.value })
						}
					/>
					<Input
						id="password"
						type="password"
						placeholder="Ваш пароль"
						value={info.password}
						onChange={(e) =>
							setInfo({
								...info,
								password: e.target.value,
							})
						}
					/>
					<Checkbox
						isChecked={info.save}
						onChange={() => setInfo({ ...info, save: !info.save })}
					>
						Сохранить адрес?
					</Checkbox>
				</Stack>
			) : null}
		</Stack>
	);
};

export default UserCreater;
