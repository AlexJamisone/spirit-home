import { Stack } from '@chakra-ui/react';
import { type NextPage } from 'next';
import Footer from '~/UI/Footer';
import MainSection from '~/UI/MainSection/MainSection';
import LineOfProduct from '~/UI/Product/LineOfProduct';
import MapsWidget from '~/UI/YandexMaps/MapsWidget';

const Home: NextPage = () => {
	return (
		<>
			<Stack as="main" gap={10} id="content">
				<MainSection />
				{/* <SearchInput setSearch={setSearch} /> */}
				<LineOfProduct />
			</Stack>
			<MapsWidget />
			<Footer />
		</>
	);
};

export default Home;
