import { Link } from '@chakra-ui/next-js';
import { Stack, Text } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import dayjs from 'dayjs';
import Instagram from '~/assets/social/Instagram';
import Telegram from '~/assets/social/Telegram';
import Youtube from '~/assets/social/Youtube';
import { socialLinks } from '~/constants/social';
dayjs().format();

const Footer = () => {
	const { isSignedIn } = useAuth();
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
			justifyContent="space-between"
            pt={5}
		>
			<Stack>
				<Link
					href={isSignedIn ? '/profile/main' : '/signin'}
					_hover={{
						textDecoration: 'none',
					}}
				>
					{isSignedIn ? 'Личный кабинет' : 'Войти'}
				</Link>
				<Link
					href={'/favorites'}
					_hover={{
						textDecoration: 'none',
					}}
				>
					Избранное
				</Link>
				<Link
					href={'/devilery'}
					_hover={{
						textDecoration: 'none',
					}}
				>
					Доставка и оплата
				</Link>
			</Stack>
			<Stack textAlign="center" alignItems="center">
				<Text fontSize="sm">Все новости о жизни бренда:</Text>
				<Stack direction="row">
                    {socialLinks.map((link) => (
                        <Link href={link.href} key={link.alt} target='_blank'>
                            <link.child/>
                        </Link>
                    ))}
				</Stack>
			</Stack>
			<Stack justifyContent="end">
				<Text>Spirit Home © {dayjs().year()} </Text>
			</Stack>
		</Stack>
	);
};

export default Footer;
