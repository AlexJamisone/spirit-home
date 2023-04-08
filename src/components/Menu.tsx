import {
	Box,
	Link as ChakraLink,
	Icon,
	Stack,
	Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { api } from '~/utils/api';
import { menuItems } from '~/constants/menuItem';

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const { data: user } = api.users.get.useQuery();
	if (!user) return null;

	
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
			my="10%"
			roundedRight={20}
		>
			{menuItems
				.filter(({ type }) => user.role === type)
				.map(({ icon, path, title }) => (
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
						transition="all .5s ease-in-out"
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
					</ChakraLink>
				))}
		</Box>
	);
};

export default Menu;
