import { Button, Divider, Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Footer from '~/UI/Footer';
import MainProductCards from '~/UI/MainSection/MainProductCards';
import MainSection from '~/UI/MainSection/MainSection';
const Home: NextPage = () => {
	return (
		<>
			<Stack
				justifyContent="center"
				gap={0}
				alignItems="center"
				as="main"
			>
				<MainSection />
				<Stack direction="row" w="100%" alignItems="center">
					<Divider borderColor="black" />
					<Text
						w="100%"
						textAlign="center"
						minW={550}
						my="44px"
						textTransform="uppercase"
					>
						Украшения из серебра, созданные на южном побережьи
						<br /> рядом с волнами и скалами
					</Text>
					<Divider borderColor="black" />
				</Stack>
				<MainProductCards />
				<Button variant="prime" my="80px">
					Все украшения
				</Button>
			</Stack>
			<Footer />
		</>
	);
};

export default Home;
