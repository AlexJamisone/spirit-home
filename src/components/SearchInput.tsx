import {
	Center,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
} from '@chakra-ui/react';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { BsSearch } from 'react-icons/bs';
import { TypeAnimation } from 'react-type-animation';

type SearchInputProps = {
	setSearch: Dispatch<SetStateAction<string>>;
};

const SearchInput = ({ setSearch }: SearchInputProps) => {
	const [animationPlaceholder, setAnimationPlaceholder] = useState(true);
	return (
		<Center>
			<InputGroup>
				<InputLeftElement>
					<Icon as={BsSearch} />
				</InputLeftElement>
				<Input
					w={['300px']}
					type="search"
					placeholder="&nbsp;"
					position="relative"
					onChange={(e) => {
						if (e.target.value.length === 0) {
							setAnimationPlaceholder(true);
							setSearch(e.target.value);
						} else {
							setAnimationPlaceholder(false);
							setSearch(e.target.value);
						}
					}}
				/>
				{animationPlaceholder ? (
					<TypeAnimation
						sequence={[
							'Кольцо',
							1500,
							'Топ',
							1500,
							'Подвеска',
							1500,
						]}
						speed={1}
						repeat={Infinity}
						style={{
							position: 'absolute',
							bottom: '21%',
							left: '14%',
							fontSize: '16px',
							color: 'gray',
							zIndex: -5,
						}}
					/>
				) : null}
			</InputGroup>
		</Center>
	);
};

export default SearchInput;
