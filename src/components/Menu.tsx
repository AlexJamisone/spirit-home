import { Box, Button, Icon, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { BsBookmarks } from 'react-icons/bs';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { SlHandbag } from 'react-icons/sl';
import { useMenuContext } from '~/context/Menu.context';

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { menuState, dispatchMenu } = useMenuContext();

	const menuItems = [
		{
			icon: AiOutlineHome,
			title: 'Home',
			state: menuState.home,
			type: 'SET_HOME',
			payload: true,
		},
		{
			icon: HiOutlineClipboardDocumentList,
			title: 'Заказы',
			state: menuState.orders,
			type: 'SET_ORDERS',
			payload: true,
		},
		{
			icon: SlHandbag,
			title: 'Корзина',
			state: menuState.cart,
			type: 'SET_CART',
			payload: true,
		},
		{
			icon: BsBookmarks,
			title: 'Избранное',
			state: menuState.favorites,
			type: 'SET_FAVORITES',
			payload: true,
		},
		{
			icon: AiOutlineUser,
			title: 'Профиль',
			state: menuState.settings,
			type: 'SET_SETTINGS',
			payload: true,
		},
	];
	return (
		<Box
			as={motion.div}
			initial={{x: -75}}
			animate={{x: 0}}
			display="flex"
			flexDirection="column"
			alignItems="center"
			cursor="pointer"
			position='fixed'
			gap={5}
			w={isOpen ? ['250px'] : ['70px']}
			bgColor="#FFCC99"
			transitionDuration="0.5s"
			maxH={['100%']}
			overflow="hidden"
			onHoverStart={() => setIsOpen(true)}
			onHoverEnd={() => setIsOpen(false)}
			py={5}
			roundedRight={20}
		>
			{menuItems.map(({ icon, state, title, type, payload }) => (
				<Button
					onClick={() => dispatchMenu({ type, payload })}
					isActive={state}
					rounded="50px"
					variant="ghost"
					key={title}
					as={motion.div}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transitionDuration="0.5s"
					h={'50px'}
					alignItems="center"
					position="relative"
					w={['80%']}
					justifyContent="center"
					gap={5}
					_hover={{
						bgColor: '#F0E6E6',
						rounded: '50px',
					}}
					overflowX="hidden"
				>
					{isOpen ? (
						<>
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
						</>
					) : (
						<Icon as={icon} boxSize={6} />
					)}
				</Button>
			))}
		</Box>
	);
};

export default Menu;
