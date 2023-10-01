import { Stack } from '@chakra-ui/react';
import { type NextPage } from 'next';
import 'swiper/css';
import 'swiper/css/pagination';
import MainTitle from '~/UI/MainTitle/MainTitle';
import Sun from '~/assets/Sun';

const Home: NextPage = () => {
	// const { data: products, isLoading } = api.products.get.useQuery();
	// const [search, setSearch] = useState('');
	return (
		<Stack direction="row" overflow="hidden" justifyContent="space-between">
			<Sun
				containerProps={{
					ml: '-500px',
					initial: {
						x: -500,
					},
					animate: {
						x: 0,
						rotate: 360,
						transition: {
							type: 'spring',
							duration: 4,
						},
					},
				}}
			/>
			<MainTitle />
			<Sun
				containerProps={{
					mr: '-500px',
					initial: {
						x: 500,
					},
					animate: {
						x: 0,
						rotate: 360,
						transition: {
							type: 'spring',
							duration: 4,
						},
					},
				}}
			/>
		</Stack>
	);
};

export default Home;
