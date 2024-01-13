import { Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Instagram from '~/assets/social/Instagram';
import Telegram from '~/assets/social/Telegram';
import Youtube from '~/assets/social/Youtube';
dayjs().format();

const Footer = () => {
	return (
		<Stack
			as="footer"
			h={'120px'}
			w="100%"
			roundedTop="3xl"
			bgColor="brand"
			position="relative"
			zIndex={200}
			px={20}
			direction="row"
		>
			<Stack direction="row">
				<Instagram />
				<Youtube />
				<Telegram />
			</Stack>
			<Text>Spirit Home © {dayjs().year()} </Text>
		</Stack>
	);
};

export default Footer;
