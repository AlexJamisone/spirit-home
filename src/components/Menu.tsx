import { Box, Button, Icon, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useReducer, useState } from 'react';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { BsBookmarks } from 'react-icons/bs';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { SlHandbag } from 'react-icons/sl';
import { MenuReducer, type MenuState } from '~/reducers/Menu.reducer';

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const initial_state: MenuState = {
		home: true,
		cart: false,
		favorites: false,
		orders: false,
		settings: false,
	};
	const [state, dispatch] = useReducer(MenuReducer, initial_state);
	const menuItems = [
		{
			icon: AiOutlineHome,
			title: 'Home',
			state: state.home,
			type: 'SET_HOME',
			payload: true,
		},
		{
			icon: HiOutlineClipboardDocumentList,
			title: 'Заказы',
			state: state.orders,
			type: 'SET_ORDERS',
			payload: true,
		},
		{
			icon: SlHandbag,
			title: 'Корзина',
			state: state.cart,
			type: 'SET_CART',
			payload: true,
		},
		{
			icon: BsBookmarks,
			title: 'Избранное',
			state: state.favorites,
			type: 'SET_FAVORITES',
			payload: true,
		},
		{
			icon: AiOutlineUser,
			title: 'Профиль',
			state: state.settings,
			type: 'SET_SETTINGS',
			payload: true,
		},
	];
	return (
		<Box
			as={motion.div}
			display="flex"
			flexDirection="column"
			alignItems="center"
			cursor="pointer"
			gap={5}
			w={isOpen ? ['250px'] : ['70px']}
			bgColor="#FFCC99"
			transitionDuration="0.5s"
			h={['100vh']}
			overflow="hidden"
			onHoverStart={() => setIsOpen(true)}
			onHoverEnd={() => setIsOpen(false)}
			py={5}
			roundedRight={20}
		>
			{menuItems.map(({ icon, state, title, type, payload }) => (
				<Button
					onClick={() => dispatch({ type, payload })}
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
