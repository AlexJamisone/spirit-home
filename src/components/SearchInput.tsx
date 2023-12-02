import {
	Center,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
} from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { BsSearch } from 'react-icons/bs';
import { TypeAnimation } from 'react-type-animation';
import { useSearch } from '~/stores/useSearch';
import { scrollToComponent } from '~/utils/scrollToComponent';

const SearchInput = () => {
	const { setSearch, animationPlaceholder, setAnimationPlaceholder } =
		useSearch();
	const handlValue = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};
	return (
		<Center my={0} mx="auto">
			<InputGroup>
				<InputLeftElement>
					<Icon as={BsSearch} />
				</InputLeftElement>
				<Input
					onFocus={() => scrollToComponent('content')}
					w={['300px']}
					type="search"
					placeholder="&nbsp;"
					position="relative"
					borderColor="second"
					onChange={(e) => {
						if (e.target.value.length === 0) {
							setAnimationPlaceholder(true);
							handlValue(e);
						} else {
							setAnimationPlaceholder(false);
							handlValue(e);
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
