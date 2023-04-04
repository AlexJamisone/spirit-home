import { Box, Icon, Stack, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { BsBookmarks } from 'react-icons/bs';
import { SlHandbag } from 'react-icons/sl';

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const menuItems = [
		{
			icon: AiOutlineHome,
			title: 'Home',
			state: true,
		},
		{
			icon: HiOutlineClipboardDocumentList,
			title: 'Заказы',
			state: false,
		},
		{
			icon: SlHandbag,
			title: 'Корзина',
			state: false,
		},
		{
			icon: BsBookmarks,
			title: 'Избранное',
			state: false,
		},
		{
			icon: AiOutlineUser,
			title: 'Профиль',
			state: false,
		},
	];
	return (
		<Box
			as={motion.div}
			display="flex"
			flexDirection="column"
			alignItems="center"
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
			{menuItems.map(({ icon, state, title }) => (
				<Button
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
