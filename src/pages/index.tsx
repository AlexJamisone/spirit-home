import { Center, Stack } from '@chakra-ui/react';
import { type NextPage } from 'next';
import 'swiper/css';
import 'swiper/css/pagination';
import Sun from '~/assets/Sun';

const Home: NextPage = () => {
	// const { data: products, isLoading } = api.products.get.useQuery();
	// const [search, setSearch] = useState('');
	return (
		<Center overflow="hidden">
			<Stack
				direction="row"
				justifyContent="space-between"
				w="50%"
				position="relative"
				h="100vh"
			>
				<Sun top={0} right={'50%'} />
			</Stack>
			<Stack
				direction="row"
				justifyContent="space-between"
				w="50%"
				position="relative"
				h="100vh"
			>
				<Sun top={0} left={'50%'} />
			</Stack>
		</Center>
	);
};

export default Home;
