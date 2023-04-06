import { Box, Stack, Icon, Text, Link as ChakraLink, AbsoluteCenter } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { BsBookmarks } from 'react-icons/bs';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { SlHandbag } from 'react-icons/sl';

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const menuItems = [
		{
			icon: AiOutlineHome,
			title: 'Home',
			path: '/profile',
		},
		{
			icon: HiOutlineClipboardDocumentList,
			title: 'Заказы',
			path: '/profile/orders',
		},
		{
			icon: SlHandbag,
			title: 'Корзина',
			path: '/profile/cart',
		},
		{
			icon: BsBookmarks,
			title: 'Избранное',
			path: '/profile/favorites',
		},
		{
			icon: AiOutlineUser,
			title: 'Профиль',
			path: '/profile/settings',
		},
	];
	return (
		<Box
			as={motion.div}
			initial={{ x: -75 }}
			animate={{ x: 0 }}
			display="flex"
			flexDirection="column"
			alignItems="center"
			cursor="pointer"
			position="fixed"
			gap={5}
			w={isOpen ? ['250px'] : ['70px']}
			bgColor="#FFCC99"
			transitionDuration="0.5s"
			maxH={['100%']}
			overflow="hidden"
			onHoverStart={() => setIsOpen(true)}
			onHoverEnd={() => setIsOpen(false)}
			py={5}
			my='10%'
			roundedRight={20}
		>
			{menuItems.map(({ icon, path, title }) => (
				<ChakraLink
					rounded="50px"
					variant="ghost"
					key={title}
					as={Link}
					href={path}
					h={'50px'}
					display="flex"
					alignItems="center"
					w={['80%']}
					justifyContent="center"
					gap={5}
					_hover={{
						bgColor: '#F0E6E6',
						rounded: '50px',
					}}
					bgColor={router.pathname === path ? '#F0E6E6' : ''}
					overflowX="hidden"
					transition='all .5s ease-in-out'
				>
					{isOpen ? (
						<Stack
							direction="row"
							alignContent="center"
							justifyContent="center"
						>
							<Icon as={icon} boxSize={6} />
							<Text
								overflowX="hidden"
								as={motion.p}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, type: 'spring' }}
								w={['100%']}
							>
								{title}
							</Text>
						</Stack>
					) : (
						<Icon as={icon} boxSize={6} />
					)}
				</ChakraLink>
			))}
		</Box>
	);
};

export default Menu;
