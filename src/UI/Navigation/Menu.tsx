import { Link } from '@chakra-ui/next-js';
import { Center, Icon, IconButton, Stack, Tooltip } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { menuItems } from '~/constants/menuItem';
import { api } from '~/utils/api';

const Menu = () => {
	const { isSignedIn } = useAuth();
	const { data: role } = api.users.getRole.useQuery();
	const router = useRouter();
	if (!isSignedIn || !role) return null;
	return (
		<Center
			as={motion.aside}
			initial={{
				x: -100,
			}}
			animate={{
				x: 0,
				transition: {
					bounce: 200,
					duration: 0.3,
				},
			}}
			position="fixed"
			zIndex={20}
			bgColor="brand"
			top={{ xl: '30%', '2xl': '40%' }}
			left={0}
			p={3}
			roundedRight="2xl"
			flexDirection="column"
			gap={5}
		>
			{menuItems
				.filter(({ type }) => type === role)
				.map(({ icon, path, title }) => (
					<Stack key={title} position="relative">
						<Tooltip
							hasArrow
							label={title}
							bg="second"
							rounded="full"
						>
							<IconButton
								isActive={router.asPath === path}
								variant="outline"
								borderColor="second"
								aria-label={title}
								rounded="full"
								icon={
									<Icon
										as={icon}
										fontSize={{ xl: 16, '2xl': 19 }}
										color="second"
									/>
								}
								as={Link}
								href={path}
							/>
						</Tooltip>
					</Stack>
				))}
		</Center>
	);
};

export default Menu;
