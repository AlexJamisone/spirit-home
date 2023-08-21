import { Link } from '@chakra-ui/next-js';
import { Box, Icon, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { menuItems } from '~/constants/menuItem';
import { api } from '~/utils/api';

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const { data: user } = api.users.getUserForFav.useQuery();
	const { data: notViewdOrders } = api.orders.getNotViewd.useQuery();
	if (!user) return null;
	if (!notViewdOrders) return null;
	const pathFromRoutes = router.query;
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
			top={'25%'}
			zIndex={20}
			gap={3}
			w={isOpen ? ['200px'] : ['70px']}
			bgColor="brand"
			transitionDuration="0.5s"
			maxH={['100%']}
			overflow="hidden"
			onHoverStart={() => setIsOpen(true)}
			onHoverEnd={() => setIsOpen(false)}
			py={5}
			roundedRight={20}
		>
			{menuItems
				.filter(({ type }) => user.role === type)
				.map(({ icon, path, title }) => (
					<Link
						rounded="50px"
						variant="ghost"
						key={title}
						href={path}
						h={'50px'}
						display="flex"
						zIndex={100}
						alignItems="center"
						w={['80%']}
						justifyContent="center"
						gap={5}
						_hover={{
							bgColor: '#F0E6E6',
							rounded: '50px',
						}}
						bgColor={
							`/profile/${pathFromRoutes.path as string}` ===
								path ||
							`/admin/${pathFromRoutes.path as string}` === path
								? '#F0E6E6'
								: ''
						}
						overflowX="hidden"
						transition="all .5s ease-in-out"
						_before={{
							content: `'${user.favorites.length}'`,
							position: 'absolute',
							bottom: isOpen ? 0 : 3,
							right: isOpen ? 3 : 0,
							width: '20px',
							height: '20px',
							bgColor: 'whiteAlpha.500',
							rounded: 'full',
							opacity:
								title === 'Избранное' &&
								user.favorites.length !== 0
									? 1
									: 0,
							lineHeight: 1.3,
							fontSize: '14px',
							fontWeight: 600,
							textAlign: 'center',
							tranistion: 'all .3s ease-in-out',
						}}
						_after={{
							content: `'${notViewdOrders.length}'`,
							position: 'absolute',
							bottom: 3.5,
							right: isOpen ? 3 : 0,
							width: '20px',
							height: '20px',
							bgColor: 'whiteAlpha.500',
							rounded: 'full',
							opacity:
								title === 'Заказы' &&
								notViewdOrders.length !== 0
									? 1
									: 0,
							lineHeight: 1.3,
							fontSize: '14px',
							fontWeight: 600,
							textAlign: 'center',
							tranistion: 'all .3s ease-in-out',
						}}
						position="relative"
					>
						{isOpen ? (
							<Stack
								direction="row"
								alignContent="center"
								justifyContent="center"
							>
								<Icon as={icon} boxSize={6} color="#261F1F" />
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
							<Icon as={icon} boxSize={6} color="#261F1F" />
						)}
					</Link>
				))}
		</Box>
	);
};

export default Menu;
