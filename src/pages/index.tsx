import { Center, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { type NextPage } from 'next';
import 'swiper/css';
import 'swiper/css/pagination';
import MainTitle from '~/UI/MainTitle/MainTitle';
import Sun from '~/assets/Sun';

const Home: NextPage = () => {
	// const { data: products, isLoading } = api.products.get.useQuery();
	// const [search, setSearch] = useState('');
	return (
		<Center overflow="hidden">
			<Stack
				as={motion.div}
				direction="row"
				justifyContent="space-between"
				w="50%"
				position="relative"
				h="100vh"
			>
				<Sun right={[null, null, '30%', '50%', '60%']} />
			</Stack>
			<MainTitle />
			<Stack
				as={motion.div}
				direction="row"
				justifyContent="space-between"
				w="50%"
				position="relative"
				h="100vh"
			>
				<Sun left={[null, null, '30%', '50%', '60%']} />
			</Stack>
		</Center>
	);
};

export default Home;
